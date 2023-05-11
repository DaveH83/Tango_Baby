import axios from "axios";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { updateChild } from "../Utilities/Utilities";
import baby_head from "../images/baby_head.jpg";

export async function ChildLoader({ params }) {
	const apiCalls = [
		`/app/child/${params.uuid}`,
		`/app/namelist/${params.uuid}`,
	];
	console.log("loader called");

	const promises = apiCalls.map((apiCall) => axios.get(apiCall));

	return Promise.all(promises)
		.then((responses) => responses.map((response) => response.data))
		.catch((error) => console.log(error));
	// console.log(Promise.all(promises)
	// 	.then(responses => responses.map(response => response.data))
	// 	.catch(error => console.log(error)))
}

export default function Child({ params }) {
	const [nickname, setNickname] = useState(null);
	const [parent2, setParent2] = useState(null);
	const [lastname, setLastName] = useState(null);
	const [selectedDueDate, setSelectedDueDate] = useState(null);
	const [editChild, setEditChild] = useState(true)
	const { user, activeChild } = useContext(UserContext);
	const data = useLoaderData();
	const child = data[0].child
	const votedNamesList = data[1].names
	const uuid = child.guest_url
	console.log(child.last_name)
	
	const handleDate = (selectedDueDate) => {
		setSelectedDueDate(selectedDueDate);
		console.log(selectedDueDate)
	};

	const handleSubmit = (uuid, nickname, parent2, lastname, selectedDueDate) => {
		updateChild(uuid, nickname, parent2, lastname, selectedDueDate)
		setEditChild(false)
	}

	

	return (
		<div className="p-2">
			<div className="">
				<div className="w-fit border rounded-lg shadow bg-gray-800 border-gray-700 items-center flex p-2">
					<div className="flex flex-col items-center p-4">
						<img
							className="w-24 h-24 mb-3 rounded-full shadow-lg"
							src={baby_head}
							alt="Baby Profile Picture"
						/>
						<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
							{activeChild.nickname}
						</h5>
						<span className="text-sm text-gray-500 dark:text-gray-400">
							{activeChild.gender === "M" ? "Boy" : "Girl"}
						</span>
					</div>

					<div className="flex flex-col items-front pb-10 border-l-2 p-4">
						<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
							Parents
						</h5>
						<span className="text-sm text-gray-500 dark:text-gray-400">
							{child.parent_1.username} | {child.parent_1.email}
						</span>
						{child.parent_2 && (
							<span className="text-sm text-gray-500 dark:text-gray-400">
								{child.parent_2.username} | {child.parent_2.email}
							</span>
						)}
					<button onClick={() => setEditChild(!editChild)}>Edit Child</button>
					</div>
				</div>
				<div>
					{editChild && 
					
					<form className="max-w-md mx-auto" onSubmit={(e) => [
						e.preventDefault(),
						handleSubmit(uuid, nickname, parent2, lastname, selectedDueDate),
						]}>

						<input id="nickname" placeholder="New Baby Nickname" label="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />

						<input id="parent2" placeholder="E-mail address of 2nd parent" label="parent2" value={parent2} onChange={(e) => setParent2(e.target.value)} />

						<input id="lastname" placeholder="Projected surname of Baby" label="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} />

						<DatePicker minDate={new Date()} value={selectedDueDate} onChange={handleDate} />

						<button type="submit" className="mt-4">Update</button>

    				</form>}
				</div>
			</div>

			<div className="name-lists mt-2">
				<div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<ul
						className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
						id="defaultTab"
						data-tabs-toggle="#defaultTabContent"
						role="tablist"
					>
						<li className="mr-2">
							<button
								id="liked-tab"
								data-tabs-target="#liked"
								type="button"
								role="tab"
								aria-controls="liked"
								aria-selected="true"
								className="inline-block p-4 text-blue-600 rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500"
							>
								Liked
							</button>
						</li>
						<li className="mr-2">
							<button
								id="disliked-tab"
								data-tabs-target="#disliked"
								type="button"
								role="tab"
								aria-controls="disliked"
								aria-selected="false"
								className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
							>
								Disliked
							</button>
						</li>
						<li className="mr-2">
							<button
								id="agreed-tab"
								data-tabs-target="#agreed"
								type="button"
								role="tab"
								aria-controls="agreed"
								aria-selected="false"
								className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
							>
								Agreed
							</button>
						</li>
					</ul>
					<div id="defaultTabContent">
						<div
							className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
							id="liked"
							role="tabpanel"
							aria-labelledby="liked-tab"
						>
							{votedNamesList.liked.length > 0 ? (
								votedNamesList.liked.map((likedNames) => (
									<p className="mb-3 text-gray-500 dark:text-white">
										{likedNames.name}
									</p>
								))
							) : (
								<p className="mb-3 text-gray-500 dark:text-white">
									You haven't liked any names yet!
								</p>
							)}
						</div>

						<div
							className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
							id="disliked"
							role="tabpanel"
							aria-labelledby="disliked-tab"
						>
							{votedNamesList.disliked.length > 0 ? (
								votedNamesList.disliked.map((dislikedNames) => (
									<p className="mb-3 text-gray-500 dark:text-white">
										{dislikedNames.name}
									</p>
								))
							) : (
								<p className="mb-3 text-gray-500 dark:text-white">
									My, aren't you open minded? You haven't disliked anything yet!
								</p>
							)}
						</div>

						<div
							className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
							id="agreed"
							role="tabpanel"
							aria-labelledby="agreed-tab"
						>
							{votedNamesList.agreed && votedNamesList.agreed.length > 0 ? (
								votedNamesList.agreed.map((agreedNames) => (
									<p className="mb-3 text-gray-500 dark:text-white">
										{agreedNames.name}
									</p>
								))
							) : (
								<p className="mb-3 text-gray-500 dark:text-white">
									Don't worry, I'm sure you'll agree on something eventually...
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
