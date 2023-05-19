import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Login, Register } from "./pages";
import { Header, Footer } from "./components";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
