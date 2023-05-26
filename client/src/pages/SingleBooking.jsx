import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AddressLink, BookingDates, PlaceGallery } from "../components";

const SingleBooking = () => {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);

	useEffect(() => {
		if (id) {
			axios
				.get("https://haneulbnb-backend.onrender.com/users/bookings")
				.then((response) => {
					const foundBooking = response.data.find(
						({ _id }) => _id === id
					);
					if (foundBooking) {
						setBooking(foundBooking);
					}
				});
		}
	}, [id]);

	if (!booking) {
		return "";
	}
	return (
		<div className="my-8">
			<h1 className="text-3xl">{booking.place.title}</h1>
			<AddressLink className="my-2 block">
				{booking.place.address}
			</AddressLink>
			<BookingDates booking={booking} />
			<PlaceGallery place={booking.place} />
		</div>
	);
};

export default SingleBooking;
