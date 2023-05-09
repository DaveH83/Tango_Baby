import axios from "axios";
import { Tabs } from "flowbite-react";
import { Card } from "flowbite"
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
	console.log(data)

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

			<div className="name-lists">

			<Tabs.Group
				aria-label="Tabs with underline"
				style="underline"
			>
			<Tabs.Item title="Profile">
				Profile content
			</Tabs.Item>
			<Tabs.Item
				active={true}
				title="Dashboard"
			>
				Dashboard content
			</Tabs.Item>
			<Tabs.Item title="Settings">
				Settings content
			</Tabs.Item>
			<Tabs.Item title="Contacts">
				Contacts content
			</Tabs.Item>
			<Tabs.Item
				disabled={true}
				title="Disabled"
			>
				Disabled content
			</Tabs.Item>
			</Tabs.Group>



			{/* <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
					<li className="mr-2">
						<button id="liked-tab" data-tabs-target="#liked" type="button" role="tab" aria-controls="liked" aria-selected="true" className="inline-block p-4 text-blue-600 rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">Liked</button>
					</li>
					<li className="mr-2">
						<button id="disliked-tab" data-tabs-target="#disliked" type="button" role="tab" aria-controls="disliked" aria-selected="false" className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Disliked</button>
					</li>
					<li className="mr-2">
						<button id="agreed-tab" data-tabs-target="#agreed" type="button" role="tab" aria-controls="agreed" aria-selected="false" className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Facts</button>
					</li>
				</ul>
				<div id="defaultTabContent">
					<div className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="liked" role="tabpanel" aria-labelledby="liked-tab">
						<h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Powering innovation & trust at 200,000+ companies worldwide</h2>
						<p className="mb-3 text-gray-500 dark:text-gray-400">Empower Developers, IT Ops, and business teams to collaborate at high velocity. Respond to changes and deliver great customer and employee service experiences fast.</p>
						<a href="#" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
							Learn more
							<svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
						</a>
					</div>
					<div className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="disliked" role="tabpanel" aria-labelledby="disliked-tab">
						<h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">We invest in the worlds potential</h2>
						
						<ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
							<li className="flex space-x-2">
						
								<svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
								<span className="leading-tight">Dynamic reports and dashboards</span>
							</li>
							<li className="flex space-x-2">
						
								<svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
								<span className="leading-tight">Templates for everyone</span>
							</li>
							<li className="flex space-x-2">
						
								<svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
								<span className="leading-tight">Development workflow</span>
							</li>
							<li className="flex space-x-2">
								
								<svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
								<span className="leading-tight">Limitless business automation</span>
							</li>
						</ul>
					</div>
					<div className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="agreed" role="tabpanel" aria-labelledby="agreed-tab">
						<dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
							<div className="flex flex-col">
								<dt className="mb-2 text-3xl font-extrabold">73M+</dt>
								<dd className="text-gray-500 dark:text-gray-400">Developers</dd>
							</div>
							<div className="flex flex-col">
								<dt className="mb-2 text-3xl font-extrabold">100M+</dt>
								<dd className="text-gray-500 dark:text-gray-400">Public repositories</dd>
							</div>
							<div className="flex flex-col">
								<dt className="mb-2 text-3xl font-extrabold">1000s</dt>
								<dd className="text-gray-500 dark:text-gray-400">Open source projects</dd>
							</div>
						</dl>
					</div>
				</div>
			</div> */}

			</div>

		</div>
	);
}
