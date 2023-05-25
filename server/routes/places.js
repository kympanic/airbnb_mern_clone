import express from "express";
import multer from "multer";
import fs from "fs";

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

export default router;
