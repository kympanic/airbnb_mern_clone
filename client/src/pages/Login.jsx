import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { setUser } = useContext(UserContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"http://127.0.0.1:8080/users/login",
				{
					email,
					password,
				}
			);
			setUser(data);
			alert("Login successful");
			setRedirect(true);
		} catch (error) {
			alert("Login failed");
		}
	};

	if (redirect) {
		return <Navigate to="/" />;
	}

	return (
		<div className="p-4 mt-4 flex flex-col min-h-screen justify-center ">
			<div className="mb-48">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="max-w-md mx-auto" onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="primary">Login</button>
					<div className="text-center py-2 text-gray-500">
						Don't have an account yet?{" "}
						<Link to="/register" className="underline text-black">
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
