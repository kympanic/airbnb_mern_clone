import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://127.0.0.1:8080/users/register", {
				name,
				email,
				password,
			});
			alert("Registration successfull. Now you can log in");
			setRedirect(true);
		} catch (error) {
			alert("Registration failed. Please try again later");
		}
	};

	return (
		<div className="p-4 mt-4 flex flex-col min-h-screen justify-center ">
			<div className="mb-48">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="John Doe"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
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
					<button className="primary">Get Started!</button>
					<div className="text-center py-2 text-gray-500">
						Already a member?{" "}
						<Link to="/login" className="underline text-black">
							Login now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
