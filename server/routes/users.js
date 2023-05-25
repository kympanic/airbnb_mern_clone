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

router.route("/logout").post((req, res) => {
	res.cookie("token", "").json(true);
});

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

router.route("/places").get((req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		const { id } = userData;
		res.json(await PlaceModel.find({ owner: id }));
	});
});

router.route("/places/:id").get(async (req, res) => {
	const { id } = req.params;
	res.json(await PlaceModel.findById(id));
});

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
			});
			await editedPlace.save();
			res.json("ok");
		}
	});
});

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
		});
		res.json(newPlace);
	});
});

export default router;
