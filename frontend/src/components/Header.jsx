import { Drawer } from "flowbite";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate, Link,useParams } from "react-router-dom";


export default function Header() {
	const [isLargeScreen, setIsLargeScreen] = useState(false);
	const {user, children, activeChild, setActiveChild} = useContext(UserContext);
	const uuid=activeChild.parent_url
	const nav = useNavigate();
	const handleLogout = async () => {
		const response = await axios.post("/user/logout/")
		response.data.success ? nav("/") : null
	};


	useEffect(() => {
		const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
		window.addEventListener("resize", handleResize);
		handleResize(); // Initial check
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (user) {
			const $targetEl = document.getElementById("drawer-navigation");
			const options = {};
			const drawer = new Drawer($targetEl, options);

			isLargeScreen ? drawer.show() : drawer.hide();
		}
	}, [isLargeScreen, user]);

	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						{user && (
							<button
								data-drawer-target="drawer-navigation"
								data-drawer-show="drawer-navigation"
								aria-controls="drawer-navigation"
								type="button"
								className="md:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							>
								<span className="sr-only">Open sidebar</span>
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
									></path>
								</svg>
							</button>
						)}
						<Link href="/" className="flex ml-2 md:mr-24">
							<img
								src="https://flowbite.com/docs/images/logo.svg"
								className="h-8 mr-3"
								alt="Logo"
							/>
							<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
								Baby Name Swiper
							</span>
						</Link>
					</div>
					<div className="flex items-center">
						{children.length > 0 && (
							<button
								id="dropdownDefaultButton"
								data-dropdown-toggle="dropdown"
								class="text-white hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark: dark:hover:bg-gray-700"
								type="button"
							>
								{activeChild.nickname ? activeChild.nickname : "Select Child"}{" "}
								<svg
									class="w-4 h-4 ml-2"
									aria-hidden="true"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									></path>
								</svg>
							</button>
						)}

						<div
							id="dropdown"
							class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
						>
							<ul
								class="py-2 text-sm text-gray-700 dark:text-gray-200"
								aria-labelledby="dropdownDefaultButton"
							>
								{children.map((child) => (
									<li>
										<a
											onClick={(e) => [
												e.preventDefault(),
												setActiveChild(child),
												// will need to add logic here to see if should use parent or guest url, using guest for now
												nav(`/child/${child.guest_url}`),
											]}
											href="#"
											class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											{child.nickname}
										</a>
									</li>
								))}
							</ul>
						</div>
						{user && (
							<div className="flex items-center ml-3">
								<div>
									<button
										type="button"
										className="flex text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 w-10 h-10 justify-center"
										aria-expanded="false"
										data-dropdown-toggle="dropdown-user"
									>
										<span className="sr-only">Open user menu</span>
										<span className="material-symbols-outlined text-4xl">
											account_circle
										</span>
									</button>
								</div>
								<div
									className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
									id="dropdown-user"
								>
									<div className="px-4 py-3" role="none">
										<p
											className="text-sm text-gray-900 dark:text-white"
											role="none"
										>
											{user.username}
										</p>
										<p
											className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
											role="none"
										>
											{user.email}
										</p>
									</div>
									<ul className="py-1" role="none">
										<li>
											<Link
												to="/"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Profile
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
											>
												Settings
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
												role="menuitem"
												onClick={handleLogout}
											>
												Sign out
											</Link>
										</li>
									</ul>
								</div>
							</div>
						)}
						{user && (
							<div
								id="drawer-navigation"
								className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800 mt-14"
								tabIndex="-1"
								aria-labelledby="drawer-navigation-label"
							>
								<h5
									id="drawer-navigation-label"
									className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
								>
									Menu
								</h5>
								<button
									type="button"
									data-drawer-hide="drawer-navigation"
									aria-controls="drawer-navigation"
									className="md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										></path>
									</svg>
									<span className="sr-only">Close menu</span>
								</button>
								<div className="py-4 overflow-y-auto">
									<ul className="space-y-2 font-medium">
										<li>
											<Link
												to="addchild"
												className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
											>
												<span className="flex-1 ml-3 whitespace-nowrap">
													Add Child
												</span>
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
											>
												<span className="flex-1 ml-3 whitespace-nowrap">
													Results
												</span>
											</Link>
										</li>
										<li>
											<Link
												to="matches"
												className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
											>
												<span className="flex-1 ml-3 whitespace-nowrap">
													Matches
												</span>
											</Link>
										</li>
										<li>
											<Link
												to={`swipe/${uuid}`}

												className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
											>
												<span className="flex-1 ml-3 whitespace-nowrap">
													Swipe Names
												</span>
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
											>
												<span className="flex-1 ml-3 whitespace-nowrap">
													Rank Choices
												</span>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
