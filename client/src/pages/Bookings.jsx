import React, { useEffect, useState } from "react";
import ProfileNav from "../components/ProfileNav";
import axios from "axios";
import { BookingDates, PlaceImg } from "../components";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	useEffect(() => {
		axios
			.get("https://haneulbnb-backend.onrender.com/users/bookings")
			.then((response) => {
				setBookings(response.data);
			});
	}, []);

	return (
		<div>
			<ProfileNav />
			<div>
				{bookings?.length > 0 &&
					bookings.map((booking) => (
						<Link
							to={`/profile/bookings/${booking._id}`}
							className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
							key={booking._id}
						>
							<div className="w-48">
								<PlaceImg place={booking.place} />
							</div>
							<div className="py-3 pr-3 grow">
								<div>
									<h2 className="text-xl">
										{booking.place.title}
									</h2>
									<BookingDates booking={booking} />
									<div className="text-xl">
										{differenceInCalendarDays(
											new Date(booking.checkOut),
											new Date(booking.checkIn)
										)}{" "}
										nights | Total price: ${booking.price}
									</div>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Bookings;
