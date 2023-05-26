const BookingWidget = ({ place }) => {
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
							<input type="date" />
						</div>
						<div className="p-3 border-l">
							<label>Check out:</label>
							<input type="date" />
						</div>
					</div>
					<div>
						<div className="p-3 border-t">
							<label>Number of guests:</label>
							<input type="number" value={1} />
						</div>
					</div>
				</div>

				<button className="primary max-w-sm mt-4">
					Book this place
				</button>
			</div>
		</div>
	);
};

export default BookingWidget;
