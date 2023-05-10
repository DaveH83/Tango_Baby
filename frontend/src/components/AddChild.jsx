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
	if (c.data.success) {
		if (parent2) {
			const vote_1 = await axios.post("/app/name/", {
				name: "DEFAULT",
				gender: gender,
				id: c.data.id,
				parent_2: null,
			});

			const vote_2 = await axios.post("/app/name/", {
				name: "DEFAULT",
				gender: gender,
				id: c.data.id,
				parent_2: parent2,
			});
			window.location.reload();
		} else {
			const vote_1 = await axios.post("/app/name/", {
				name: "DEFAULT",
				gender: gender,
				id: c.data.id,
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
		console.log(selectedDueDate)
	};

	return (
		<div>
			<form
				onSubmit={(e) => [
					e.preventDefault(),
					axCreateChild(parent2, nickname, lastname, gender, selectedDueDate),
				]}
			>
				<div className="mb-6">
					{user ? (
						<>
							<label
								htmlFor="parent1"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Parent 1
							</label>
							<input
								type="email"
								id="parent1"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Parent 1
							</label>
							<input
								type="email"
								id="parent1"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@email.com"
								required
							/>
						</>
					)}
				</div>
				<div className="mb-6">
					<label
						htmlFor="parent2"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Parent 2
					</label>
					<input
						type="email"
						id="parent2"
						placeholder="optional@optional.com"
						value={parent2}
						onChange={(e) => setParent2(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="nickname"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Child Nickname
					</label>
					<input
						type="text"
						id="nickname"
						placeholder="Our first baby"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="lastname"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Last Name
					</label>
					<input
						type="text"
						id="lastname"
						placeholder="Optional last name"
						value={lastname}
						onChange={(e) => setLastName(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div className="flex items-start mb-6">
					<fieldset>
						<legend className="sr-only">Gender</legend>

						<div className="flex items-center mb-4">
							<input
								id="gender-option-1"
								type="radio"
								name="gender"
								value="M"
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								checked={gender === "M"}
								onClick={() => setGender("M")}
							/>
							<label
								htmlFor="gender-option-1"
								className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
								className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Girl
							</label>
						</div>
					</fieldset>
				</div>
				<div>
					<DatePicker minDate={new Date()} value={selectedDueDate} onChange={handleDate} />
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Create Child
				</button>
			</form>
		</div>
	);
}
