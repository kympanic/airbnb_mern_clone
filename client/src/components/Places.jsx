import { Link, useParams } from "react-router-dom";

const Places = () => {
	const { action } = useParams();

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
						/>
						<h2 className="text-2xl mt-4">Address</h2>
						<p className="text-gray-500 text-sm">
							address to this place
						</p>
						<input type="text" placeholder="address" />
						<h2 className="text-2xl mt-4">Photos</h2>
						<p className="text-gray-500 text-sm">
							including more photos is always better
						</p>
						<div className="flex gap-2">
							<input
								type="text"
								placeholder="add using a link ....jpeg"
							/>
							<button className="bg-gray-200 px-4 rounded-2xl">
								Add&nbsp;Photo
							</button>
						</div>
						<div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg-grid-cols-6">
							<button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
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
							</button>
						</div>
						<h2 className="text-2xl mt-4">Description</h2>
						<p className="text-gray-500 text-sm">
							describe the place
						</p>
						<textarea />
						<h2 className="text-2xl mt-4">Perks</h2>
						<p className="text-gray-500 text-sm">
							select the appropriate perks
						</p>
						<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
							<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
								<input type="checkbox" />
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
										d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
									/>
								</svg>
								<span>Wifi</span>
							</label>
							<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
								<input type="checkbox" />
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
										d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
									/>
								</svg>
								<span>Free Parking</span>
							</label>
							<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
								<input type="checkbox" />
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
										d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
									/>
								</svg>
								<span>TV</span>
							</label>
							<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
								<input type="checkbox" />
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
										d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
									/>
								</svg>
								<span>Pool</span>
							</label>
							<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
								<input type="checkbox" />
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
										d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
									/>
								</svg>
								<span>Pets</span>
							</label>
							<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
								<input type="checkbox" />
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
										d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
									/>
								</svg>
								<span>Private Entrance</span>
							</label>
						</div>
						<h2 className="text-2xl mt-4">Extra Info</h2>
						<p className="text-gray-500 text-sm">
							rules, restrictions, etc...
						</p>
						<textarea />
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
								<input type="text" placeholder="14:00" />
							</div>
							<div>
								<h3 className="mt-2 -mb-1 text-center">
									Check Out Time
								</h3>
								<input type="text" />
							</div>
							<div>
								<h3 className="mt-2 -mb-1 text-center">
									Max Number of Guests
								</h3>
								<input type="text" />
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
