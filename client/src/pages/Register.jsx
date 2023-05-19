import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div className="p-4 mt-4 flex flex-col min-h-screen justify-center ">
			<div className="mb-48">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto">
					<input type="text" placeholder="John Doe" />
					<input type="email" placeholder="your@email.com" />
					<input type="password" placeholder="password" />
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
