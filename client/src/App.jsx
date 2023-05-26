import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Login, Register, Profile, PlaceInfo } from "./pages";
import { Header, Places, PlacesForm } from "./components";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Layout from "./pages/Layout";

// axios.defaults.baseURL = "http://127.0.0.1:8080";
axios.defaults.withCredentials = true;

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Header />
				<Routes>
					{/* <Route path="/" element={<Layout />}> */}
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
					{/* </Route> */}
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
