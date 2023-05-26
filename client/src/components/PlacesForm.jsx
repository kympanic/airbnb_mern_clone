import { useState, useEffect } from "react";
import Perks from "./Perks";
import axios from "axios";
import ProfileNav from "./ProfileNav";
import { Navigate, useParams } from "react-router-dom";
import Image from "./Image";

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
	const [price, setPrice] = useState(100);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`http://127.0.0.1:8080/places/${id}`).then((response) => {
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
			setPrice(data.price);
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

	const deletePhoto = (e, filename) => {
		e.preventDefault();
		setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
	};

	const selectMainPhoto = (e, filename) => {
		e.preventDefault();
		setAddedPhotos([
			filename,
			...addedPhotos.filter((photo) => photo !== filename),
		]);
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
			price,
		};
		if (id) {
			await axios.put("http://127.0.0.1:8080/places/edit", {
				id,
				...currentPlace,
			});
			setRedirect(true);
		} else {
			await axios.post(
				"http://127.0.0.1:8080/places/upload",
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
						{addedPhotos?.length > 0 &&
							addedPhotos.map((link) => (
								<div key={link} className="flex h-32 relative">
									<Image
										className="rounded-2xl w-full object-cover"
										src={link}
										alt=""
									/>
									<button
										onClick={(e) => deletePhoto(e, link)}
										className="absolute bottom-1 right-1 text-white bg-opacity-50 bg-black rounded-2xl py-2 px-3 cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</button>
									<button
										onClick={(e) =>
											selectMainPhoto(e, link)
										}
										className="absolute bottom-1 left-1 bg-opacity-50 bg-white rounded-2xl py-2 px-3 cursor-pointer"
									>
										{link === addedPhotos[0] && (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-6 h-6"
											>
												<path
													fillRule="evenodd"
													d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
													clipRule="evenodd"
												/>
											</svg>
										)}
										{link !== addedPhotos[0] && (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
												/>
											</svg>
										)}
									</button>
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
					<div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
						<div>
							<h3 className="mt-2 -mb-1 text-center">
								Price per night
							</h3>
							<input
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
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
