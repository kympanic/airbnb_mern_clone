import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "../components";

const Home = () => {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		axios
			.get("https://haneulbnb-backend.onrender.com/places/all")
			.then((response) => {
				setPlaces([...response.data]);
			});
	}, []);

	return (
		<div className="mt-8 grid gap-x-6  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8  ">
			{places.length > 0 &&
				places.map((place) => (
					<Link to={`/place/${place._id}`} key={place._id}>
						<div className="bg-gray-500 mb-2 rounded-2xl flex">
							{place.photos?.[0] && (
								<Image
									className="rounded-2xl object-cover aspect-square"
									src={place.photos?.[0]}
									alt=""
								/>
							)}
						</div>
						<h2 className="font-bold ">{place.address}</h2>
						<h3 className="text-sm truncate leading-4">
							{place.title}
						</h3>
						<div className="mt-1">
							<span className="font-bold mb-4">
								${place.price}{" "}
							</span>
							per night
						</div>
					</Link>
				))}
		</div>
	);
};

export default Home;
