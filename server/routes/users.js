import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../mongodb/models/User.js";

const router = express.Router();

const bcryptPassword = bcrypt.genSaltSync(10);
const jwtSecret = "jogsdgf8JF2d";
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
					res.cookie("token", token).json("pass ok");
				}
			);
		} else {
			res.status(422).json("pass not ok");
		}
	} else {
		res.json("notfound");
	}
});

export default router;
