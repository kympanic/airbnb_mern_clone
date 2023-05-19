const express = require("express");

const app = express();

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
