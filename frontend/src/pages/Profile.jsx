import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";

const updatePassword = async (password,confirmPassword) => {
	if (password === confirmPassword) {
		// attempt back end password update
		const r = axios.put()
	}
	else {
		// some kind of alert that passwords dont match
	}
}

export default function Profile() {
	const { user } = useContext(UserContext)
	
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");


	console.log(user)
	return (
		<div className="flex items-center flex-col">
			<h1 className="text-transform: capitalize text-4xl">Welcome {user.username}!</h1>
			<h6 className="text-sm">Last Updated: { user.last_updated }</h6>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updatePassword();
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
	);
}
