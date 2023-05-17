import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";



export default function Results() {
	const data = useLoaderData();
	console.log(data)
	return (
		<div className="flex justify-center">
			
			<div 
				class="block max-w-sm my-6 sm:m-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
			>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Your Favoritfe Name is {data[0][1]}</h5>
				<p class="font-normal text-gray-700 dark:text-white">The rest of your agreed names are ranked as follows:</p>
				<ol>
					{data.map((name, index) => {
						if(index > 1){
							return	(<li class="font-normal text-gray-700 dark:text-gray-400">
								{name[1]}
							</li>)
						
						}
						})}
				</ol>
			</div>

			
			<ul>
				
			</ul>
		</div>
	);
}
