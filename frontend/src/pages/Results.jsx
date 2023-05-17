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
				class="block w-7/10  my-6 sm:m-5 p-6 bg-white border border-gray-200 rounded-xl  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-xl mx-5"
			>
				<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900   dark:text-white">Your Favorite Name is <p className="text-blue-800 text-3xl inline">{data[0][1]}</p></h5>
				<p class="font-normal text-gray-500 dark:text-white">The rest of your agreed names are ranked as follows:</p>
				<ol >
					{data.map((name, index) => {
						if(index > 1){
							return	(<li class="block max-w-sm mb-3 sm:m-5 p-2 text-gray-900 border-gray-200 rounded-3xl  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow">
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
