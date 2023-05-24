import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
	const { ready, user, setUser } = useContext(UserContext);
	const [redirect, setRedirect] = useState(null);
	let { subpage } = useParams();

	//if subpage is undefined, we change type to link classes between the three tabs
	if (subpage === undefined) {
		subpage = "profile";
	}

	//shifting css classnames between tabs
	const linkClassNames = (type = null) => {
		let classes = "py-2 px-6";
		if (type === subpage) {
			classes += " bg-primary text-white rounded-full";
		}
		return classes;
	};

	//from UserContent to properly load profilepage
	if (!ready) {
		return "Loading...";
	}

	if (ready && !user && !redirect) {
		return <Navigate to="/login" />;
	}

	//logout
	const logout = async () => {
		await axios.post("/users/logout");
		setRedirect("/");
		setUser(null);
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<div>
			<nav className="w-full flex justify-center mt-8 mb-8 gap-2">
				<Link className={linkClassNames("profile")} to="/profile">
					My Profile
				</Link>

				<Link
					className={linkClassNames("bookings")}
					to="/profile/bookings"
				>
					My Bookings
				</Link>
				<Link className={linkClassNames("places")} to="/profile/places">
					My Accommodations
				</Link>
			</nav>
			{subpage === "profile" && (
				<div className="text-center max-w-lg mx-auto">
					Logged in as {user.name} ({user.email})
					<button className="primary max-w-sm mt-2" onClick={logout}>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Profile;
