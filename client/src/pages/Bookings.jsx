import React, { useEffect, useState } from "react";
import ProfileNav from "../components/ProfileNav";
import axios from "axios";
import { PlaceImg } from "../components";

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	useEffect(() => {
		axios.get("http://127.0.0.1:8080/users/bookings").then((response) => {
			setBookings(response.data);
		});
	}, []);

	return (
		<div>
			<ProfileNav />
			<div>
				{bookings?.length > 0 &&
					bookings.map((booking) => (
						<div key={booking._id}>
							<div>
								<PlaceImg place={booking.place} />
							</div>
							{booking.checkIn} - {booking.checkOut}
						</div>
					))}
			</div>
		</div>
	);
};

export default Bookings;
