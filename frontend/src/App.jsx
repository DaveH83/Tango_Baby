import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(true);
	}, []);

	return (
		<div>
			<Header />
			<div className="mt-16 md:ml-64">{isLoggedIn ? <Outlet /> : <Auth />}</div>
		</div>
	);
}
