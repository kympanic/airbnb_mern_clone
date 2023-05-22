import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Login, Register, Profile } from "./pages";
import { Header, Footer } from "./components";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://127.0.0.1:8080";
axios.defaults.withCredentials = true;

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
