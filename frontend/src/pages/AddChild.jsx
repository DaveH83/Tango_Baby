import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const axCreateChild = async (parent2, nickname, gender, nav, testKids, setTestKids) => {
	// creates the child object
	const c = await axios.post("/app/children/", {
		parent_2: parent2,
		nickname: nickname,
		gender: gender,
	});
	// attempt to update children context with new child
	setTestKids([...testKids, c.data.child])
	// then creates a voted_name object for that child
	if (c.data.success) {
		const n = axios
			.post("/app/name/", {
				name: name,
				gender: gender,
				id: c.data.id,
			})
			.then(
				// then nav to the childs unique ccid page, parent_url here since was just created by parent
				nav(`/child/${c.data.child.parent_url}`)
			)
			.catch((e) => console.log("name error", e.message));
	}
};

export default function AddChild() {
	//user context
	const { user, testKids, setTestKids } = useContext(UserContext);

	//nav handler
	const nav = useNavigate();

	//state handlers for form data
	const [parent2, setParent2] = useState(null);
	const [nickname, setNickname] = useState(null);
	const [gender, setGender] = useState("M");
	const [name, setName] = useState(null);

	return (
		<div>
			<form
				onSubmit={(e) => [
					e.preventDefault(),
					axCreateChild(parent2, nickname, gender, nav, testKids, setTestKids),
				]}
			>
				<div class="mb-6">
					{user ? (
						<>
							<label
								for="parent1"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Parent 1
							</label>
							<input
								type="email"
								id="parent1"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
								for="parent1"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Parent 1
							</label>
							<input
								type="email"
								id="parent1"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@email.com"
								required
							/>
						</>
					)}
				</div>
				<div class="mb-6">
					<label
						for="parent2"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Parent 2 {"(optional)"}
					</label>
					<input
						type="email"
						id="parent2"
						value={parent2}
						onChange={(e) => setParent2(e.target.value)}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div class="mb-6">
					<label
						for="nickname"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Child Nickname
					</label>
					<input
						type="text"
						id="nickname"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				{/* These radio buttons are not permanent and also don't work correctly, 
				they reset to Male alot, perhaps a drop down would be better? Send halp. */}
				<div class="flex items-start mb-6">
					<fieldset>
						<legend class="sr-only">Gender</legend>

						<div class="flex items-center mb-4">
							<input
								id="gender-option-1"
								type="radio"
								name="gender"
								value="M"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								checked
								onClickCapture={() => setGender("M")}
							/>
							<label
								for="gender-option-1"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Boy
							</label>
						</div>

						<div class="flex items-center mb-4">
							<input
								id="gender-option-2"
								type="radio"
								name="gender"
								value="F"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
								onClickCapture={() => setGender("F")}
							/>
							<label
								for="gender-option-2"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Girl
							</label>
						</div>
					</fieldset>
				</div>
				<div class="mb-6">
					<label
						for="nickname"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						First Name Suggestion
					</label>
					<input
						type="text"
						id="nickname"
						value={name}
						onChange={(e) => setName(e.target.value)}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<button
					type="submit"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Create Child
				</button>
			</form>
		</div>
	);
}
