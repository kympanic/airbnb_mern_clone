import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../mongodb/models/User.js";
import PlaceModel from "../mongodb/models/Place.js";

const router = express.Router();
const bcryptPassword = bcrypt.genSaltSync(10);
export const jwtSecret = "jogsdgf8JF2d";

router.route("/test").get((req, res) => {
	res.status(200).json("This is a test!");
});

//register user
router.route("/register").post(async (req, res) => {
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

//return all places by owner
router.route("/places").get((req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		const { id } = userData;
		res.json(await PlaceModel.find({ owner: id }));
	});
});

//return all places
router.route("/places-all").get(async (req, res) => {
	res.json(await PlaceModel.find());
});

//return place by placeid
router.route("/places/:id").get(async (req, res) => {
	const { id } = req.params;
	res.json(await PlaceModel.findById(id));
});

//edit a place
router.route("/edit/place").put(async (req, res) => {
	const { token } = req.cookies;
	const {
		id,
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price,
	} = req.body;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const editedPlace = await PlaceModel.findById(id);
		if (userData.id === editedPlace.owner.toString()) {
			editedPlace.set({
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price,
			});
			await editedPlace.save();
			res.json("ok");
		}
	});
});

//upload a new place
router.route("/upload/place").post(async (req, res) => {
	const { token } = req.cookies;
	const {
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price,
	} = req.body;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const newPlace = await PlaceModel.create({
			owner: userData.id,
			title,
			address,
			photos: addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price,
		});
		res.json(newPlace);
	});
});

export default router;
