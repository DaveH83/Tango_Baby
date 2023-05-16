import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";



export default function Results() {
	const data = useLoaderData();
	console.log(data)
	return (
		<div>
			<h3>Your most favored name is {data[0][1]}</h3>
			<ul>
				
			</ul>
		</div>
	);
}
