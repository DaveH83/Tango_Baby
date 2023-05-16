import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddChild from "../components/AddChild";
import baby_head from "../images/baby_head.jpg";

const updatePassword = async (
	email,
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	nav
) => {
	if (password === confirmPassword) {
		// attempt back end password update
		const r = await axios.put("/user/curr-user/", {
			password,
		});
		// if success then relog in the user since dJango logs them out on password update
		if (r.data.success) {
			const l = await axios.post("/user/login/", {
				email,
				password,
			});
			if (l.data.user) {
				setPassword("");
				setConfirmPassword("");
				nav("/");
			} else {
				alert("Try again.");
			}
		}
	} else {
		// some kind of alert that passwords dont match
	}
};

const deleteUser = async () => {
	// really need to add some confirmation type of thing here
	// force user to re-enter password or something
	// send halp.

	const r = await axios.delete("/user/curr-user/");
	r.data.success ? window.location.reload() : alert("something went wrong");
};

export default function Profile() {
	const { user, children, setActiveChild } = useContext(UserContext);
	const nav = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<div className="p-6">
			<h1 className="text-transform: capitalize text-3xl font-bold">
				Welcome, {user.username}!
			</h1>
			<div className="pb-4 flex flex-wrap justify-center md:justify-start pt-4">
				{children.map((child) => (
					<div
						key={child.guest_url}
						className="w-fit p-4  bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col m-2 "
					>
						<img
							className="w-24 h-24 mb-3 rounded-full shadow-lg"
							src={baby_head}
							alt="Baby Profile Picture"
						/>
						<h5 className="mb-2 text-xl tracking-tight  text-gray-500 dark:text-white">
							{child.nickname}
						</h5>
						<Link
							to={`/child/${child.guest_url}`}
							className="inline-flex items-center px-3 py-2 text-sm font-sm text-center text-white rounded-xl  focus:ring-4 focus:outline-none bg-gray-600 hover:bg-blue-700 focus:ring-blue-800"
							onClick={() => setActiveChild(child)}
						>
							More Info
							<svg
								aria-hidden="true"
								className="w-4 h-4 ml-2 -mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</Link>
					</div>
				))}
			</div>
			<div
				id="accordion-collapse"
				data-accordion="collapse"
				className="bg-gray-800 overflow-hidden rounded-xl "
			>
				<h2 id="accordion-collapse-heading-1">
					<button
						type="button"
						className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-800"
						data-accordion-target="#accordion-collapse-body-1"
						aria-expanded="false"
						aria-controls="accordion-collapse-body-1"
					>
						<span>Add Child</span>
						<svg
							data-accordion-icon
							className="w-6 h-6 rotate-180 shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</h2>
				<div
					id="accordion-collapse-body-1"
					className="hidden"
					aria-labelledby="accordion-collapse-heading-1"
				>
					<div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
						<AddChild />
					</div>
				</div>
				<h2 id="accordion-collapse-heading-2">
					<button
						type="button"
						className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-800"
						data-accordion-target="#accordion-collapse-body-2"
						aria-expanded="false"
						aria-controls="accordion-collapse-body-2"
					>
						<span>Update Profile</span>
						<svg
							data-accordion-icon
							className="w-6 h-6 shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</h2>
				<div
					id="accordion-collapse-body-2"
					className="hidden dark:bg-gray-900 p-8"
					aria-labelledby="accordion-collapse-heading-2"
				>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							updatePassword(
								user.email,
								password,
								setPassword,
								confirmPassword,
								setConfirmPassword,
								nav
							);
						}}
						className="w-full rounded-xl  flex flex-col"
					>
						<div className="mb-5 text-xl text-white font-bold">
							Update Password
						</div>

						<label
							htmlFor="input-group-3"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Password
						</label>
						<div className="relative mb-6">
							<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
								<span className="material-symbols-outlined w-5 h-5 text-gray-500 dark:text-gray-400">
									key
								</span>
							</div>
							<input
								type="password"
								name="password"
								id="input-group-3"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<label
							htmlFor="input-group-4"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Confirm Password
						</label>
						<div className="relative mb-6">
							<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
								<span className="material-symbols-outlined w-5 h-5 text-gray-500 dark:text-gray-400">
									key
								</span>
							</div>
							<input
								type="password"
								id="input-group-4"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Confirm Password"
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl  text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full sm:w-fit"
						>
							Update
						</button>
					</form>
					<button
						data-modal-target="popup-modal"
						data-modal-toggle="popup-modal"
						className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl  text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-4"
						type="button"
					>
						Delete Account
					</button>

					<div
						id="popup-modal"
						tabIndex="-1"
						className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
					>
						<div className="relative w-full max-w-md max-h-full">
							<div className="relative bg-white rounded-xl  shadow dark:bg-gray-700">
								<button
									type="button"
									className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl  text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
									data-modal-hide="popup-modal"
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
									<span className="sr-only">Close modal</span>
								</button>
								<div className="p-6 text-center">
									<svg
										aria-hidden="true"
										className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										></path>
									</svg>
									<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
										Are you sure you want to delete your account?
									</h3>
									<button
										data-modal-hide="popup-modal"
										type="button"
										className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-xl  text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
										onClick={deleteUser}
									>
										Yes, I&apos;m sure
									</button>
									<button
										data-modal-hide="popup-modal"
										type="button"
										className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-xl  border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
									>
										No, cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <h2 id="accordion-collapse-heading-3">
					<button
						type="button"
						className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
						data-accordion-target="#accordion-collapse-body-3"
						aria-expanded="false"
						aria-controls="accordion-collapse-body-3"
					>
						<span>
							What are the differences between Flowbite and Tailwind UI?
						</span>
						<svg
							data-accordion-icon
							className="w-6 h-6 shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</h2>
				<div
					id="accordion-collapse-body-3"
					className="hidden"
					aria-labelledby="accordion-collapse-heading-3"
				>
					<div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
						<p className="mb-2 text-gray-500 dark:text-gray-400">
							The main difference is that the core components from Flowbite are
							open source under the MIT license, whereas Tailwind UI is a paid
							product. Another difference is that Flowbite relies on smaller and
							standalone components, whereas Tailwind UI offers sections of
							pages.
						</p>
						<p className="mb-2 text-gray-500 dark:text-gray-400">
							However, we actually recommend using both Flowbite, Flowbite Pro,
							and even Tailwind UI as there is no technical reason stopping you
							from using the best of two worlds.
						</p>
						<p className="mb-2 text-gray-500 dark:text-gray-400">
							Learn more about these technologies:
						</p>
						<ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
							<li>
								<a
									href="https://flowbite.com/pro/"
									className="text-blue-600 dark:text-blue-500 hover:underline"
								>
									Flowbite Pro
								</a>
							</li>
							<li>
								<a
									href="https://tailwindui.com/"
									rel="nofollow"
									className="text-blue-600 dark:text-blue-500 hover:underline"
								>
									Tailwind UI
								</a>
							</li>
						</ul>
					</div>
				</div> */}
			</div>
		</div>
	);
}
