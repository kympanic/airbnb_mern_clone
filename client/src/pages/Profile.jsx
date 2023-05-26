import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import { Places } from "../components";
import axios from "axios";
import ProfileNav from "../components/ProfileNav";

const Profile = () => {
	const { ready, user, setUser } = useContext(UserContext);
	const [redirect, setRedirect] = useState(null);
	let { subpage } = useParams();

	//if subpage is undefined, we change type to link classes between the three tabs
	if (subpage === undefined) {
		subpage = "profile";
	}

	//from UserContent to properly load profilepage
	if (!ready) {
		return "Loading...";
	}

	if (ready && !user && !redirect) {
		return <Navigate to="/login" />;
	}

	//logout
	const logout = async () => {
		await axios.post("https://haneulbnb-backend.onrender.com/users/logout");
		setRedirect("/");
		setUser(null);
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<div>
			<ProfileNav />
			{subpage === "profile" && (
				<div className="text-center max-w-lg mx-auto">
					Logged in as {user.name} ({user.email})
					<button className="primary max-w-sm mt-2" onClick={logout}>
						Logout
					</button>
				</div>
			)}
			{subpage === "places" && <Places />}
		</div>
	);
};

export default Profile;
