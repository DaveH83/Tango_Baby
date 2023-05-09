import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddChild from "../components/AddChild";

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
	const { user, children } = useContext(UserContext);
	const nav = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<div>
			<h1 className="text-transform: capitalize text-4xl">
				Welcome {user.username}!
			</h1>
			<h6 className="text-sm">Last Updated: {user.last_updated}</h6>
			<div>
				{children.map((child) => (
					<div
						key={child.guest_url}
						className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					>
						{/* <a href="#"> */}
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{child.nickname}
						</h5>
						{/* </a> */}
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							Some more text
						</p>
						<Link
							to={`/child/${child.guest_url}`}
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
			<div id="accordion-collapse" data-accordion="collapse">
				<h2 id="accordion-collapse-heading-1">
					<button
						type="button"
						className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
						data-accordion-target="#accordion-collapse-body-1"
						aria-expanded="true"
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
						className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
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
					className="hidden"
					aria-labelledby="accordion-collapse-heading-2"
				>
					<div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
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
							className="w-[300px] bg-slate-600 p-8 rounded-lg mt-10 flex flex-col"
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
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Confirm Password"
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div>
							<button
								type="submit"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							>
								Update
							</button>
						</form>
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
			<div>
				<button
					type="button"
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
					onClick={deleteUser}
				>
					Delete User
				</button>
			</div>
		</div>
	);
}
