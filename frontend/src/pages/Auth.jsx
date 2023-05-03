import { useState } from "react";
import axios from "axios";

function Login({ setIsLogin, setIsLoggedIn }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const response = await axios.post("/user/login/", {
				email,
				password,
			});
			if (response.data.user !== null) {
				setIsLoggedIn(true);
			} else {
				alert("Try again.");
			}
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<div className="flex items-center flex-col">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
				className="w-[300px] bg-slate-600 p-8 rounded-lg mt-10 flex flex-col"
			>
				<div className="mb-5 text-2xl text-white font-bold">Log-In</div>
				<label
					htmlFor="input-group-1"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Email
				</label>
				<div className="relative mb-6">
					<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
						</svg>
					</div>
					<input
						type="text"
						id="input-group-1"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@email.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<label
					htmlFor="input-group-1"
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
						id="input-group-1"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Submit
				</button>
			</form>

			<div>
				Or, instead{" "}
				<span
					className="underline text-blue-600 hover:text-[#6cceff] hover:cursor-pointer"
					onClick={() => {
						setIsLogin(false);
					}}
				>
					create an account
				</span>
				.
			</div>
		</div>
	);
}

function SignUp({ setIsLogin, setIsLoggedIn }) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const validatePassword = () => {
		if (confirmPassword === password) {
			return true;
		} else {
			return false;
		}
	};

	const handleRegister = async () => {
		try {
			if (!validatePassword()) {
				alert("Passwords do not match.");
				return;
			}
			axios
				.post("/user/register/", {
					email,
					username,
					password,
				})
				.then(() => {
					axios.post("/user/login/", {
						email,
						password,
					});
				})
				.then(() => {
					setIsLoggedIn(true);
				});
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<div className="flex items-center flex-col">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleRegister();
				}}
				className="w-[300px] bg-slate-600 p-8 rounded-lg mt-10 flex flex-col"
			>
				<div className="mb-5 text-2xl text-white font-bold">Sign-Up</div>
				<label
					htmlFor="input-group-1"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Email
				</label>
				<div className="relative mb-6">
					<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
						</svg>
					</div>
					<input
						type="text"
						id="input-group-1"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@email.com"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<label
					htmlFor="input-group-1"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Username
				</label>
				<div className="relative mb-6">
					<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
						<span className="material-symbols-outlined w-5 h-5 text-gray-500 dark:text-gray-400">
							person
						</span>
					</div>
					<input
						type="text"
						id="input-group-1"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<label
					htmlFor="input-group-1"
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
						id="input-group-1"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<label
					htmlFor="input-group-1"
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
						id="input-group-1"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Submit
				</button>
			</form>

			<div>
				Or, instead{" "}
				<span
					className="underline text-blue-600 hover:text-[#6cceff] hover:cursor-pointer"
					onClick={() => {
						setIsLogin(true);
					}}
				>
					login
				</span>
				.
			</div>
		</div>
	);
}

export default function Auth({ setIsLoggedIn }) {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			{isLogin ? (
				<Login setIsLogin={setIsLogin} setIsLoggedIn={setIsLoggedIn} />
			) : (
				<SignUp setIsLogin={setIsLogin} setIsLoggedIn={setIsLoggedIn} />
			)}
		</>
	);
}
