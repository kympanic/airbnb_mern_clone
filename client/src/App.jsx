import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import {
	Home,
	Login,
	Register,
	Profile,
	PlaceInfo,
	Bookings,
	SingleBooking,
} from "./pages";
import { Header, Places, PlacesForm } from "./components";
import axios from "axios";
import { UserContextProvider } from "./UserContext";

// axios.defaults.baseURL = "http://127.0.0.1:8080";
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
					<Route path="/profile/places" element={<Places />} />
					<Route
						path="/profile/places/new"
						element={<PlacesForm />}
					/>
					<Route
						path="/profile/places/:id"
						element={<PlacesForm />}
					/>
					<Route path="/place/:id" element={<PlaceInfo />} />
					<Route path="/profile/bookings" element={<Bookings />} />
					<Route
						path="/profile/bookings/:id"
						element={<SingleBooking />}
					/>
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
