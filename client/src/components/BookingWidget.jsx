import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const BookingWidget = ({ place }) => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [redirect, setRedirect] = useState("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setName(user.name);
		}
	}, [user]);

	let numberOfNights;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	const handleBooking = async (e) => {
		e.preventDefault();
		const response = await axios.post(
			"http://127.0.0.1:8080/users/booking",
			{
				place: place._id,
				checkIn,
				checkOut,
				numberOfGuests,
				name,
				phone,
				price: numberOfNights * place.price,
			}
		);
		const bookingId = response.data._id;
		setRedirect(`/profile/bookings/${bookingId}`);
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div>
			<div className="bg-white shadow p-4 rounded-2xl text-center">
				<div className="text-2xl text-center">
					Price: ${place.price} / per night
				</div>
				<div className="border rounded-2xl mt-4">
					<div className="flex justify-evenly">
						<div className="p-3 ">
							<label>Check in:</label>
							<input
								type="date"
								value={checkIn}
								onChange={(e) => setCheckIn(e.target.value)}
							/>
						</div>
						<div className="p-3 border-l">
							<label>Check out:</label>
							<input
								type="date"
								value={checkOut}
								onChange={(e) => setCheckOut(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<div className="p-3 border-t">
							<label>Number of guests:</label>
							<input
								type="number"
								value={numberOfGuests}
								onChange={(e) =>
									setNumberOfGuests(e.target.value)
								}
							/>
						</div>
					</div>
					{numberOfNights > 0 && (
						<div className="p-3 border-t">
							<label>Your full name:</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<label>Phone number:</label>
							<input
								type="tel"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
					)}
				</div>
				<button
					className="primary max-w-sm mt-4"
					onClick={handleBooking}
				>
					Book this place
					{numberOfNights > 0 && (
						<>
							<span> ${numberOfNights * place.price}</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default BookingWidget;
