import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import Auth from "./pages/Auth";
import axios from "axios";

axios.defaults.withCredentials = true;

export const UserInfo = createContext({});

export function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	async function getUserInfo() {
		const response = await axios.get("/user/curr-user/");
		if (response.data.error) {
			return;
		} else {
			setUserInfo(response.data);
			setIsLoggedIn(true);
		}
	}

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<UserInfo.Provider value={userInfo}>
			<div>
				{isLoggedIn ? (
					<>
						<Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
						<div className="mt-16 md:ml-64">
							{isLoggedIn ? (
								<Outlet />
							) : (
								<Auth setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
							)}
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
