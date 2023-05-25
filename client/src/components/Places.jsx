import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

const Places = () => {
	const { action } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);

	const uploadPhoto = (e) => {
		const files = e.target.files;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}
		axios
			.post("http://127.0.0.1:8080/places/upload", data, {
				headers: { "Content-type": "multipart/form-data" },
			})
			.then((response) => {
				const { data: filenames } = response;
				setAddedPhotos((prev) => {
					return [...prev, ...filenames];
				});
			});
	};

	return (
		<div>
			{action !== "new" && (
				<div className="text-center">
					<Link
						className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
						to="/profile/places/new"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path
								fillRule="evenodd"
								d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
								clipRule="evenodd"
							/>
						</svg>
						Add new place
					</Link>
				</div>
			)}
			{action === "new" && (
				<div>
					<form>
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
						{/* <div className="flex gap-2">
							<input
								type="text"
								placeholder="add using a link ....jpeg"
								value={photoLink}
								onChange={(e) => setPhotoLink(e.target.value)}
							/>
							<button className="bg-gray-200 px-4 rounded-2xl">
								Add&nbsp;Photo
							</button>
						</div> */}
						<div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg-grid-cols-6">
							{addedPhotos.length > 0 &&
								addedPhotos.map((link) => (
									<div key={link} className="flex h-32">
										<img
											className="rounded-2xl w-full object-cover"
											src={
												"http://localhost:8080/uploads/" +
												link
											}
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
						<p className="text-gray-500 text-sm">
							describe the place
						</p>
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
							remember to have time window for cleaning rooms
							between guests
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
									onChange={(e) =>
										setCheckOut(e.target.value)
									}
								/>
							</div>
							<div>
								<h3 className="mt-2 -mb-1 text-center">
									Max Number of Guests
								</h3>
								<input
									type="number"
									value={maxGuests}
									onChange={(e) =>
										setMaxGuests(e.target.value)
									}
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
			)}
		</div>
	);
};

export default Places;
