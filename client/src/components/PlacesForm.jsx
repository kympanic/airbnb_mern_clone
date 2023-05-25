import { useState, useEffect } from "react";
import Perks from "./Perks";
import axios from "axios";
import ProfileNav from "./ProfileNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesForm = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios
			.get(`http://127.0.0.1:8080/users/places/${id}`)
			.then((response) => {
				const { data } = response;
				setTitle(data.title);
				setAddress(data.address);
				setAddedPhotos(data.photos);
				setDescription(data.description);
				setPerks(data.perks);
				setExtraInfo(data.extraInfo);
				setCheckIn(data.checkIn);
				setCheckOut(data.checkOut);
				setMaxGuests(data.maxGuests);
			});
	}, [id]);

	const uploadPhoto = (e) => {
		const files = e.target.files;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}
		axios
			.post("http://127.0.0.1:8080/places/upload/photos", data, {
				headers: { "Content-type": "multipart/form-data" },
			})
			.then((response) => {
				const { data: filenames } = response;
				setAddedPhotos((prev) => {
					return [...prev, ...filenames];
				});
			});
	};

	const savePlace = async (e) => {
		e.preventDefault();
		const currentPlace = {
			title,
			address,
			addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
		};
		if (id) {
			await axios.put("http://127.0.0.1:8080/users/edit/place", {
				id,
				...currentPlace,
			});
			setRedirect(true);
		} else {
			await axios.post(
				"http://127.0.0.1:8080/users/upload/place",
				currentPlace
			);
			setRedirect(true);
		}
	};

	if (redirect) {
		return <Navigate to="/profile/places" />;
	}

	return (
		<>
			<ProfileNav />
			<div>
				<form onSubmit={savePlace}>
					<h2 className="text-2xl mt-4">Title</h2>
					<p className="text-gray-500 text-sm">
						title for your place. Should be short and catchy
					</p>
					<input
						type="text"
						placeholder="title, for example: My lovely studio"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<h2 className="text-2xl mt-4">Address</h2>
					<p className="text-gray-500 text-sm">
						address to this place
					</p>
					<input
						type="text"
						placeholder="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<h2 className="text-2xl mt-4">Photos</h2>
					<p className="text-gray-500 text-sm">
						including more photos is always better
					</p>
					<div className="mt-2 gap-3 grid grid-cols-3 md:grid-cols-4 lg-grid-cols-6">
						{addedPhotos.length > 0 &&
							addedPhotos.map((link) => (
								<div key={link} className="flex h-32">
									<img
										className="rounded-2xl w-full object-cover"
										src={`http://localhost:8080/uploads/${link}`}
										alt=""
									/>
								</div>
							))}
						<label className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
							<input
								type="file"
								multiple
								className="hidden"
								onChange={uploadPhoto}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
								/>
							</svg>
							Upload
						</label>
					</div>
					<h2 className="text-2xl mt-4">Description</h2>
					<p className="text-gray-500 text-sm">describe the place</p>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<h2 className="text-2xl mt-4">Perks</h2>
					<p className="text-gray-500 text-sm">
						select the appropriate perks
					</p>
					<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
						<Perks selected={perks} onChange={setPerks} />
					</div>
					<h2 className="text-2xl mt-4">Extra Info</h2>
					<p className="text-gray-500 text-sm">
						rules, restrictions, etc...
					</p>
					<textarea
						value={extraInfo}
						onChange={(e) => setExtraInfo(e.target.value)}
					/>
					<h2 className="text-2xl mt-4">
						Check In Time & Check Out Time, Max Guests
					</h2>
					<p className="text-gray-500 text-sm">
						remember to have time window for cleaning rooms between
						guests
					</p>
					<div className="grid gap-2 sm:grid-cols-3">
						<div>
							<h3 className="mt-2 -mb-1 text-center">
								Check In Time
							</h3>
							<input
								type="text"
								placeholder="14"
								value={checkIn}
								onChange={(e) => setCheckIn(e.target.value)}
							/>
						</div>
						<div>
							<h3 className="mt-2 -mb-1 text-center">
								Check Out Time
							</h3>
							<input
								type="text"
								placeholder="11"
								value={checkOut}
								onChange={(e) => setCheckOut(e.target.value)}
							/>
						</div>
						<div>
							<h3 className="mt-2 -mb-1 text-center">
								Max Number of Guests
							</h3>
							<input
								type="number"
								value={maxGuests}
								onChange={(e) => setMaxGuests(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<button className="primary my-4 max-w-md">
							Save Place
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default PlacesForm;
