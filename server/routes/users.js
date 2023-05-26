import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../mongodb/models/User.js";
import PlaceModel from "../mongodb/models/Place.js";
import BookingModel from "../mongodb/models/Booking.js";
import connectDB from "../mongodb/connect.js";

const router = express.Router();
const bcryptPassword = bcrypt.genSaltSync(10);
export const jwtSecret = "jogsdgf8JF2d";

router.route("/test").get((req, res) => {
	connectDB(process.env.MONGODB_URL);
	res.status(200).json("This is a test!");
});

function getUserDataFromReq(req) {
	return new Promise((resolve, reject) => {
		jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			resolve(userData);
		});
	});
}

//register user
router.route("/register").post(async (req, res) => {
	connectDB(process.env.MONGODB_URL);
	const { name, email, password } = req.body;
	try {
		const newUser = await UserModel.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptPassword),
		});
		res.json(newUser);
	} catch (error) {
		res.status(422).json(error);
	}
});

//login user
router.route("/login").post(async (req, res) => {
	connectDB(process.env.MONGODB_URL);
	const { email, password } = req.body;
	const userDoc = await UserModel.findOne({ email });
	if (userDoc) {
		const passOk = bcrypt.compareSync(password, userDoc.password);
		if (passOk) {
			jwt.sign(
				{
					email: userDoc.email,
					id: userDoc._id,
				},
				jwtSecret,
				{}, //options is empty
				(err, token) => {
					if (err) throw err;
					res.cookie("token", token).json(userDoc);
				}
			);
		} else {
			res.status(422).json("pass not ok");
		}
	} else {
		res.status(422).json("User not found");
	}
});

//logout user
router.route("/logout").post((req, res) => {
	res.cookie("token", "").json(true);
});

//check loginuser and send info
router.route("/profile").get(async (req, res) => {
	connectDB(process.env.MONGODB_URL);
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			const { name, email, _id } = await UserModel.findById(userData.id);
			res.json({ name, email, _id });
		});
	} else {
		res.json(null);
	}
});

//booking
router.post("/booking", async (req, res) => {
	connectDB(process.env.MONGODB_URL);
	const userData = await getUserDataFromReq(req);
	const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
		req.body;
	BookingModel.create({
		user: userData.id,
		place,
		checkIn,
		checkOut,
		numberOfGuests,
		name,
		phone,
		price,
	})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			throw err;
		});
});

router.get("/bookings", async (req, res) => {
	connectDB(process.env.MONGODB_URL);
	const userData = await getUserDataFromReq(req);
	res.json(await BookingModel.find({ user: userData.id }).populate("place"));
});

export default router;
