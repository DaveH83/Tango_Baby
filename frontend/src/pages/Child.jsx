import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function ChildLoader({ params }) {
	
	// console.log(params.uuid)
	const apiCalls = [`/app/child/${params.uuid}`, `/app/namelist/${params.uuid}`]
	// const apiCalls = [`/app/child/${params.uuid}`]
	// console.log(apiCalls[0])
	const promises = apiCalls.map(apiCall => axios.get(apiCall))

	return Promise.all(promises)
		.then(responses => responses.map(response => response.data))
		.catch(error => console.log(error))
}

export default function Child() {
	const data = useLoaderData();
	const child = data[0].child

	return (
		<div>
			<h1>Child Page</h1>
			<p>Picture: {"=)" }</p>
			<p>Nickname: {child.nickname}</p>
			<p>Gender: {child.gender}</p>
			<p>Parent_1 Username: {child.parent_1.username}</p>
			<p>Parent_1 Email: {child.parent_1.email}</p>
			{child.parent_2 && (
				<div>
					<p>Parent_2 Username: {child.parent_2.username}</p>
					<p>Parent_2 Email: {child.parent_2.email}</p>
				</div>
			)}
			<br />
			<br />
			<h2>Current Voted Names can go here? Or other stuff, might add expected due date to Child model?</h2>
		</div>
	);
}
