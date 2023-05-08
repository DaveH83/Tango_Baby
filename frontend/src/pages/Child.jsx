import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function ChildLoader({ params }) {
	const r = await axios.get(`/app/child/${params.uuid}`);
	return r.data.success ? r.data.child : r.data.message;
}

export default function Child() {
	const child = useLoaderData();

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
