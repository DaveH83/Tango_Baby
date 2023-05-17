import axios from "axios";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { updateChild, deleteChild } from "../Utilities/Utilities";
import baby_head from "../images/baby_head.jpg";
import { initFlowbite } from "flowbite";

export async function ChildLoader({ params }) {
	const apiCalls = [
		`/app/child/${params.uuid}`,
		`/app/namelist/${params.uuid}`,
	];

	const promises = apiCalls.map((apiCall) => axios.get(apiCall));

	return Promise.all(promises)
		.then((responses) => responses.map((response) => response.data))
		.catch((error) => console.log(error));
}

export default function Child() {
	const data = useLoaderData();
	const child = data[0].child;
	const [nickname, setNickname] = useState(child.nickname);
	const [parent2, setParent2] = useState(null);
	const [lastname, setLastName] = useState(child.last_name);
	const [selectedDueDate, setSelectedDueDate] = useState(child.due_date);
	const [editChild, setEditChild] = useState(false);
	const { activeChild, setActiveChild } = useContext(UserContext);
	const votedNamesList = data[1].names;
	const uuid = child.guest_url;


	const handleDate = (selectedDueDate) => {
		setSelectedDueDate(selectedDueDate);
	};

	const handleSubmit = (uuid, nickname, parent2, lastname, selectedDueDate) => {
		updateChild(uuid, nickname, parent2, lastname, selectedDueDate);
		setEditChild(false);
		window.location.reload();
	};

	const handleDelete = () => {
		deleteChild(uuid)
	}

	useEffect (() => {
		initFlowbite()
	}, [editChild])

	return (
		<div className="p-2 ">
			<div className="w-full lg:w-fit   ">
				<div className="w-full lg:w-fit border rounded-xl shadow bg-gray-800 border-gray-700 items-center flex p-2 justify-start md:justify-center" >
					<div className="flex flex-col items-center p-4 m-2">
						<img
							className="w-24 h-24 mb-3 rounded-full shadow-lg"
							src={baby_head}
							alt="Baby Profile Picture"
						/>
						<h5 className="mb-2 text-xl font-medium text-white dark:text-white">
							{activeChild.nickname}
						</h5>
						<span className="text-sm text-gray-500 dark:text-gray-400">
							{activeChild.gender === "M" ? "Boy" : "Girl"}
						</span>
						<span className="text-sm text-gray-500 dark:text-gray-400">
							Due: {activeChild.due_date}
						</span>
					</div>

					<div className="flex flex-col items-front pb-10 border-l-2 p-4">
						<h5 className="mb-2 text-xl font-medium text-white dark:text-white">
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
						<button
							className="inline-flex items-center px-3 py-2 text-sm font-medium  text-white rounded-xl focus:ring-4 focus:outline-none bg-gray-600 hover:bg-blue-700 focus:ring-blue-800 mt-2"
							onClick={() => [
								setEditChild(!editChild),
								initFlowbite(),
								console.log('child page init flobite')
							]}
						>
							Edit Child
						</button>
					</div>
				</div>
				{editChild && (
					<div className="w-full border rounded-xl shadow bg-gray-800 border-gray-700 items-center flex my-2 " >
					
						<form
							className="w-full mx-2"
							onSubmit={(e) => [
								e.preventDefault(),
								handleSubmit(
									uuid,
									nickname,
									parent2,
									lastname,
									selectedDueDate
								),
							]}
						>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2 "
								id="nickname"
								placeholder="New Baby Nickname"
								label="nickname"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
							/>

							{!child.parent_2 && (
								<input
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2"
									id="parent2"
									placeholder="E-mail address of 2nd parent"
									label="parent2"
									value={parent2}
									onChange={(e) => setParent2(e.target.value)}
								/>
							)}

							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2"
								id="lastname"
								placeholder="Projected surname of Baby"
								label="lastname"
								value={lastname}
								onChange={(e) => setLastName(e.target.value)}
							/>

							<div className="relative max-w-sm">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg
										aria-hidden="true"
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
								<input
									datepicker
									datepicker-autohide
									type="date"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder={child.due_date}
									value={selectedDueDate}
									onChange={(e) => [handleDate(e.target.value)]}
								/>
							</div>

							<button
								type="submit"
								className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-xl focus:ring-4 focus:outline-none bg-gray-600 hover:bg-blue-700 focus:ring-blue-800 my-2"
							>
								Update
							</button>

					<button
						data-modal-target="popup-modal"
						data-modal-toggle="popup-modal"
						className=" w-40 block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-4"
						type="button"
					>
						Delete Child
					</button>

					<div
						id="popup-modal"
						tabIndex="-1"
						className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
					>
						<div className="relative w-full max-w-md max-h-full">
							<div className="relative bg-white rounded-xl shadow dark:bg-gray-700">
								<button
									type="button"
									className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
										Are you sure you want to delete your child?
									</h3>
									<p className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">Did you ask your wife?</p>
									<a href="/">
									<button
										data-modal-hide="popup-modal"
										type="button"
										className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-xl text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
										onClick={() => handleDelete(uuid)}
									>
										Yes, I&apos;m sure
									</button>
									</a>
									<button
										data-modal-hide="popup-modal"
										type="button"
										className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-xl border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
									>
										No, cancel
									</button>
								</div>
							</div>
						</div>
					</div>

						</form>
						

							
					</div>
				)}
			</div>

			<div className="name-lists mt-2">
				<div className="w-full bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
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
							className="hidden p-4 bg-white rounded-xl md:p-8 dark:bg-gray-800"
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
							className="hidden p-4 bg-white rounded-xl md:p-8 dark:bg-gray-800"
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
							className="hidden p-4 bg-white rounded-xl md:p-8 dark:bg-gray-800"
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
