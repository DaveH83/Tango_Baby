import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import Auth from "./pages/Auth";
import axios from "axios";
import { initFlowbite } from "flowbite";

axios.defaults.withCredentials = true;

export const UserInfo = createContext({
	userInfo: {},
	setUserInfo: () => {},
});

export function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	async function getUserInfo() {
		const response = await axios.get("/user/curr-user/");
		if (response.data.error) {
			setUserInfo({});
			setIsLoggedIn(false);
		} else {
			setIsLoggedIn(true);
			setUserInfo(response.data);
		}
	}

	useEffect(() => {
		getUserInfo();
	}, []);

	useEffect(() => {
		initFlowbite();
	});

	return (
		<UserInfo.Provider value={{ userInfo, setUserInfo }}>
			<div>
				{isLoggedIn ? (
					<>
						<Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
						<div className="mt-16 md:ml-64">
							<Outlet />
						</div>
					</>
				) : (
					<>
						<Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
						<div className="mt-16">
							<Auth setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
						</div>
					</>
				)}
			</div>
		</UserInfo.Provider>
	);
}
