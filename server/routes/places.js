import express from "express";
import fs from "fs";
import PlaceModel from "../mongodb/models/Place.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./users.js";
import multer from "multer";
import { PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3";

const router = express.Router();
const bucket = "airbnb-mern-danyoo";

const uploadToS3 = async (path, originalFilename, mimetype) => {
	const client = new S3Client({
		region: "us-west-2",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		},
	});
	const parts = originalFilename.split(".");
	const ext = parts[parts.length - 1];
	const newFilename = Date.now() + "." + ext;
	await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Body: fs.readFileSync(path),
			Key: newFilename,
			ContentType: mimetype,
			ACL: "public-read",
		})
	);
	return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
};

router.route("/test").get((req, res) => {
	res.status(200).json("This is a test!");
});

const photosMiddleware = multer({ dest: "/tmp" });

router.get("/testing", (req, res) => {
	res.json("does this work?");
});

router.post(
	"/upload/photos",
	photosMiddleware.array("photos", 100),
	async (req, res) => {
		//rename file to include ext when saved to have .webp/jpeg/png etc..
		const uploadedFiles = [];
		for (let i = 0; i < req.files.length; i++) {
			const { path, originalname, mimetype } = req.files[i];
			const url = await uploadToS3(path, originalname, mimetype);
			uploadedFiles.push(url);
		}
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
