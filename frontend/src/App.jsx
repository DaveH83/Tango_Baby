import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import Auth from "./pages/Auth";
import axios from "axios";
import { initFlowbite } from "flowbite";
import { handleCSRF, getDadJoke } from "./Utilities/Utilities";

export const UserContext = createContext(null);

export async function AppLoader() {
	const r = await axios.get("/user/curr-user/");
	if (r.data.error) {
		return null;
	}
	return r.data;
}

export function App() {
	const [dadJoke, setDadJoke] = useState("");
	const data = useLoaderData();
	let user = null;
	let children = [];
	const location = useLocation();

	if (data) {
		user = data.curr_user;
		children = data.children;
	}
	const [activeChild, setActiveChild] = useState({});

	handleCSRF();

	useEffect(() => {
		children.length > 0
			? Object.keys(activeChild).length === 0
				? setActiveChild(data.children[0])
				: null
			: setActiveChild({});
		initFlowbite();
	}, [location, data]);

	useEffect(() => {
		if (Object.keys(activeChild).length > 0) {
			const awaitDadJoke = async () => {
				setDadJoke(await getDadJoke());
				let banner = document.getElementById("bottom-banner");
				banner.classList.remove("hidden");
				banner.classList.add("flex");
			};
			awaitDadJoke();
		}
	}, [activeChild]);

	return (
		<UserContext.Provider
			value={{ user, children, activeChild, setActiveChild }}
		>
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

			<div
				id="bottom-banner"
				tabindex="-1"
				class="fixed bottom-0 left-0 z-50 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
			>
				<div class="flex items-center mx-auto">
					<p class="flex items-center text-lg font-normal text-gray-500 dark:text-gray-200">
						<span>{dadJoke}</span>
					</p>
				</div>
				<div class="flex items-center">
					<button
						data-dismiss-target="#bottom-banner"
						type="button"
						class="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg
							aria-hidden="true"
							class="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="sr-only">Close banner</span>
					</button>
				</div>
			</div>
		</UserContext.Provider>
	);
}
