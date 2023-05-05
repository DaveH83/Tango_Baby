import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import Auth from "./pages/Auth";
import axios from "axios";
import { initFlowbite } from "flowbite";
import { handleCSRF } from "./Utilities/Utilities";

export const UserContext = createContext(null);

export async function AppLoader() {
	const r = await axios.get("/user/curr-user/");
	if (r.data.error) {
		return null;
	}
	return r.data;
}

export function App() {
	const data = useLoaderData();
	let user = null
	let children = []
	
	if (data){
		user = data.curr_user
		children = data.children
	}
	const [activeChild, setActiveChild] = useState({})
	
	handleCSRF();

	useEffect(() => {
		initFlowbite();
	}, [user]);

	return (
		<UserContext.Provider value={{user, children, activeChild, setActiveChild}}>
			<div>
				<Header />
				{user ? (
					<div className="mt-16 md:ml-64">
						<Outlet />
					</div>
				) : (
					<div className="mt-16">
						<Auth />
					</div>
				)}
			</div>
		</UserContext.Provider>
	);
}
