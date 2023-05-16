import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AgreedList from "../components/AgreedList.jsx"

export async function RankLoader({params}) {
	const resp = await axios.get(`/app/new/child/`)
	
	if (resp.data) {
		const child = resp.data.find(child => child.guest_url == params.uuid)
		// console.log(child)
		// console.log(child.id)
		const resp2 = await axios.get(`/app/new/child/${child.id}/`)
		// console.log(resp2)
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
			<div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
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
		console.log(resp)
		if (resp.data.success) {
			location.reload()
		}
	};

	return (
		<>
			<div className="pb-4 flex flex-wrap justify-center md:justify-start pt-4">
				<button
					className="w-fit p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col mr-2"
					onClick={()=>handleClick(choices[0].id)}
				>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{choices[0].name}
					</h5>
				</button>
				<button
					className="w-fit p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center flex-col mr-2"
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
