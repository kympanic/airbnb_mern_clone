import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import placeRoutes from "./routes/places.js";
import connectDB from "./mongodb/connect.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname + "/uploads", "<=thi sis the dirname");

//parse the json from request
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
	cors({
		credentials: true,
		origin: "https://haneulbnb-frontend.onrender.com",
	})
);
app.use("/users", userRoutes);
app.use("/places", placeRoutes);

app.get("/test", async (req, res) => {
	res.json("test ok");
});

const serverStart = async () => {
	try {
		app.listen(8080, () => console.log("Server started on port 8080"));
	} catch (error) {
		console.log(error);
	}
};

serverStart();
