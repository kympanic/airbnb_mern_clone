import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		axios.get("http://127.0.0.1:8080/users/places-all").then((response) => {
			setPlaces([
				...response.data,
				...response.data,
				...response.data,
				...response.data,
			]);
		});
	}, []);

	return (
		<div className="mt-8 grid gap-x-6  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8 min-h-screen ">
			{places.length > 0 &&
				places.map((place) => (
					<div>
						<div className="bg-gray-500 mb-2 rounded-2xl flex">
							{place.photos?.[0] && (
								<img
									className="rounded-2xl object-cover aspect-square"
									src={`http://localhost:8080/uploads/${place.photos?.[0]}`}
									alt=""
								/>
							)}
						</div>
						<h2 className="font-bold ">{place.address}</h2>
						<h3 className="text-sm truncate leading-4">
							{place.title}
						</h3>
						<div className="mt-1">
							<span className="font-bold">${place.price} </span>
							per night
						</div>
					</div>
				))}
		</div>
	);
};

export default Home;
