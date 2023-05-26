import express from "express";
import multer from "multer";
import fs from "fs";
import PlaceModel from "../mongodb/models/Place.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./users.js";

const router = express.Router();

router.route("/test").get((req, res) => {
	res.status(200).json("This is a test!");
});

const photosMiddleware = multer({ dest: "uploads" });

router.get("/testing", (req, res) => {
	res.json("does this work?");
});

router.post(
	"/upload/photos",
	photosMiddleware.array("photos", 100),
	(req, res) => {
		//rename file to include ext when saved to have .webp/jpeg/png etc..
		const uploadedFiles = [];
		for (let i = 0; i < req.files.length; i++) {
			const { path, originalname } = req.files[i];
			const parts = originalname.split(".");
			const ext = parts[parts.length - 1];
			const newPath = path + "." + ext;
			fs.renameSync(path, newPath);
			uploadedFiles.push(newPath.replace("uploads/", ""));
		}
		console.log(uploadedFiles);
		res.json(uploadedFiles);
	}
);

//return all places by owner
router.route("/").get((req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		const { id } = userData;
		res.json(await PlaceModel.find({ owner: id }));
	});
});

//return all places
router.route("/all").get(async (req, res) => {
	res.json(await PlaceModel.find());
});

//return place by placeid
router.route("/:id").get(async (req, res) => {
	const { id } = req.params;
	res.json(await PlaceModel.findById(id));
});

//edit a place
router.route("/edit").put(async (req, res) => {
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
router.route("/upload").post(async (req, res) => {
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
