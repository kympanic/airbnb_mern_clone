import mongoose from "mongoose";

const Place = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: { type: String, required: true },
	address: { type: String, required: true, unique: true },
	photos: [String],
	description: String,
	perks: [String],
	extraInfo: String,
	checkIn: Number,
	checkOut: Number,
	maxGuests: Number,
	price: Number,
});

const PlaceModel = mongoose.model("Place", Place);

export default PlaceModel;
