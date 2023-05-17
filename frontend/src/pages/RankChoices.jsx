import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AgreedList from "../components/AgreedList.jsx"

export async function RankLoader({ params }) {
	// this is a band-aid solution via get call to clean database of duplicate votes before rendering
	const bandaid = await axios.get(`/app/namelist/${params.uuid}`)

	
	const resp = await axios.get(`/app/new/child/`)
	
	if (resp.data) {
		const child = resp.data.find(child => child.guest_url == params.uuid)
		const resp2 = await axios.get(`/app/new/child/${child.id}/`)
		if (resp2.data) {
			if (resp2.data.agreed.length>1){
				return resp2.data.agreed
			}
		}
	}
	return null
}

export function RankChoices() {
	const agreedNames = useLoaderData();

	if (!agreedNames) {
		return (
			<div className="p-4 bg-white rounded-xl md:p-8 dark:bg-gray-800">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Come back after you like some more names!</h5>
			</div>
		)
	}

	const randomIndices = (lst) => {
		let first = Math.floor(Math.random()*(lst.length));
		let second = Math.floor(Math.random()*(lst.length));
		while (second === first) {
			second = Math.floor(Math.random()*(lst.length));
		}
		console.log(first, second)
		return [first, second]
	}
	const [choices, setChoices] = useState(randomIndices(agreedNames).map((i) => agreedNames[i]))

	const handleClick = async (id) => {
		const resp = await axios.post(`/app/new/add_rank/`, {'name': id});
		if (resp.data.success) {
			location.reload()
		}
	};

	return (
		<>
			<div className="pb-4 flex flex-wrap justify-center md:justify-start pt-4 mx-5">
				<button
					className="w-fit p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col mr-2"
					onClick={()=>handleClick(choices[0].id)}
				>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{choices[0].name}
					</h5>
				</button>
				<button
					className="w-fit p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col mr-2"
					onClick={()=>handleClick(choices[1].id)}
				>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{choices[1].name}
					</h5>
				</button>
			</div>
			<AgreedList names={agreedNames} />
		</>
	);
}
