import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.js";
import connectDB from "./mongodb/connect.js";

dotenv.config();
const app = express();
//parse the json from request
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: "http://127.0.0.1:5173",
	})
);

app.use("/users", userRoutes);

app.get("/test", async (req, res) => {
	res.json("test ok");
});

const serverStart = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () => console.log("Server started on port 8080"));
	} catch (error) {
		console.log(error);
	}
};

serverStart();
