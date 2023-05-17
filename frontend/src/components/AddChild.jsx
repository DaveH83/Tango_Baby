import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const axCreateChild = async (
	parent2,
	nickname,
	lastname,
	gender,
	selectedDueDate
) => {
	// creates the child object
	const c = await axios.post("/app/children/", {
		parent_2: parent2,
		nickname: nickname,
		lastname: lastname,
		gender: gender,
		due_date: selectedDueDate,
	});
	// then creates a voted_name object for that child
	console.log(c.data)
	if (c.data.success) {
		if (parent2) {
			const vote_1 = await axios.post("/app/name/", {
				name: "DEFAULT",
				gender: gender,
				child: c.data.child,
				parent_2: null,
			});

			const vote_2 = await axios.post("/app/name/", {
				name: "DEFAULT",
				gender: gender,
				child: c.data.child,
				parent_2: parent2,
			});
			window.location.reload();
		} else {
			const vote_1 = await axios.post("/app/name/", {
				name: "DEFAULT",
				gender: gender,
				child: c.data.child,
				parent_2: parent2,
			});
			window.location.reload();
		}
	}
};

export default function AddChild() {
	//user context
	const { user } = useContext(UserContext);

	//state handlers for form data
	const [parent2, setParent2] = useState(null);
	const [nickname, setNickname] = useState(null);
	const [lastname, setLastName] = useState(null);
	const [gender, setGender] = useState("M");
	const [selectedDueDate, setselectedDueDate] = useState(null);
	const handleDate = (selectedDueDate) => {
		setselectedDueDate(selectedDueDate);
		console.log(selectedDueDate);
	};

	return (
		<div>
			<form
				onSubmit={(e) => [
					e.preventDefault(),
					axCreateChild(parent2, nickname, lastname, gender, selectedDueDate),
				]}
				className="grid grid-cols-2 gap-2"
			>
				<div className="mb-6">
					{user ? (
						<>
							<label
								htmlFor="parent1"
								className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
							>
								Parent 1
							</label>
							<input
								type="email"
								id="parent1"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@flowbite.com"
								value={user.email}
								disabled
								required
							/>
						</>
					) : (
						//this is a fallback for the user not being populated but it *should* never happen
						<>
							<label
								htmlFor="parent1"
								className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
							>
								Parent 1
							</label>
							<input
								type="email"
								id="parent1"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@email.com"
								required
							/>
						</>
					)}
				</div>
				<div className="mb-6">
					<label
						htmlFor="parent2"
						className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
					>
						Parent 2
					</label>
					<input
						type="email"
						id="parent2"
						placeholder="optional@optional.com"
						value={parent2}
						onChange={(e) => setParent2(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="nickname"
						className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
					>
						Child Nickname
					</label>
					<input
						type="text"
						id="nickname"
						placeholder="Our first baby"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="lastname"
						className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
					>
						Last Name
					</label>
					<input
						type="text"
						id="lastname"
						placeholder="Optional last name"
						value={lastname}
						onChange={(e) => setLastName(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="date-picker"
						className="block text-sm font-medium text-gray-500 dark:text-white mb-2"
					>
						When is the baby due?:
					</label>
					<div className="relative max-w-sm">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
							</div>
							<input datepicker datepicker-autohide 
								type="date" 
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
								placeholder="select date"
								
								value={selectedDueDate}
								onChange={(e) => [
									handleDate(e.target.value)
								]}
								/>
						</div>
				</div>
				<div></div>
				<div className="flex items-start mb-6">
					<fieldset>
						<legend className="sr-only">Gender</legend>
						<label
							htmlFor="gender"
							className="block mb-2 text-sm font-medium text-gray-500 dark:text-white mt-2"
						>
							Gender:
						</label>

						<div className="flex items-center mb-4">
							<input
								id="gender-option-1"
								type="radio"
								name="gender"
								value="M"
								className="w-4 h-4  border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								checked={gender === "M"}
								onClick={() => setGender("M")}
							/>
							<label
								htmlFor="gender-option-1"
								className="block ml-2 text-sm font-medium text-gray-500 dark:text-gray-300"
							>
								Boy
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								id="gender-option-2"
								type="radio"
								name="gender"
								checked={gender === "F"}
								value="F"
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								onClick={() => setGender("F")}
							/>
							<label
								htmlFor="gender-option-2"
								className="block ml-2 text-sm font-medium text-gray-500 dark:text-gray-300"
							>
								Girl
							</label>
						</div>
					</fieldset>
				</div>
				<div></div>

				<button
					type="submit"
					className="text-white bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800 h-fit hover:text-gray-600 hover:bg-white hover:border-gray-600 hover:drop-shadow-xl
					focus:border-gray-300 w-40"
				>
					Create Child
				</button>
			</form>
		</div>
	);
}