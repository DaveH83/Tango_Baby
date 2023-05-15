import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import TinderCard from 'react-tinder-card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { nameListLoader, swipeHandler } from '../Utilities/Utilities';
import AddName from '../components/AddName';
import { UserContext } from "../App";



export default function SwipeNames() {
	const nameList=useLoaderData();
	const [toShowList,setToShowList]=useState(nameList); 
	const [listLength,setListLength]=useState(toShowList.length)
	const {uuid}=useParams();
	const {children,activeChild} = useContext(UserContext)
	const [previousName, setPreviousName] = useState(null);

	//handler for swiping name card
	const onSwipe = (name, direction) => {
		if (previousName === name.name) return; // if the current name is the same as the previous name, return
		console.log(previousName,name.name)
		setPreviousName(name.name);
		// Update liked based on swipe direction
		if (direction === "right") {
			swipeHandler(name, uuid, true)
			setListLength(preLength=>preLength-1)
		} else if (direction === "left") {
			swipeHandler(name, uuid, false);
			setListLength(preLength=>preLength-1)
		}
	};
	
	//handler for clicking icon
	const onClick = (name, button) => {
		if (button === "right") {
			swipeHandler(name, uuid, true);
			setToShowList((prevList) => prevList.slice(0, -1));
			setListLength(preLength=>preLength-1)
			console.log(name,'right')

		}
		else if(button==='left'){
			swipeHandler(name,uuid,false);
			setToShowList((prevList) => prevList.slice(0, -1));
			setListLength(preLength=>preLength-1)
			console.log(name,'left')
	}}

	// working on this, its not working yet
	useEffect(()=>{
		const refetchData = async () => {
			if (listLength === 1) {
			  const newList = await nameListLoader(uuid);
			  setToShowList((prevList) => [...prevList, ...newList]);
			
			}};
			refetchData();
			setListLength(toShowList.length)

	},[listLength])
	

	return (
		children && (<>
		
			<div className='swipe-name-container'>
			<p>Swipe name for {activeChild.nickname}</p>
			<div className="card-container h-[500px]">
				{toShowList.map((name) => (
				<>
					<div className="single-card">
						<TinderCard
							className="tinder_card"
							onSwipe={(dir) => onSwipe(name, dir)}
							preventSwipe={["up", "down"]}
							swipeRequirementType='position'
							swipeThreshold = {200}
						>
							<p className="name-holder" key={name.id}>
								{name.name}
							</p>
						</TinderCard>
						<div className="icons">
								<button 
								className="icon-button"
								onClick={() => onClick(name, "left")}>
									<HeartBrokenIcon className='heart-broken-icon' fontSize="large" />
								</button>
								<button 
								className="icon-button"
								onClick={() => onClick(name, "right")}>
									<FavoriteIcon className="favorite-icon" fontSize="large" />
								</button>
							</div>
					</div>
				</>		
				))}	
			</div>
			
			</div>
			<div
				id="accordion-collapse"
				data-accordion="collapse"
				className="bg-gray-800 overflow-hidden rounded-lg"
			>
				<h2 id="accordion-collapse-heading-1">
					<button
						type="button"
						className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-800"
						data-accordion-target="#accordion-collapse-body-1"
						aria-expanded="false"
						aria-controls="accordion-collapse-body-1"
					>
						<span>Add Name</span>
						<svg
							data-accordion-icon
							className="w-6 h-6 rotate-180 shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</h2>
				<div
					id="accordion-collapse-body-1"
					className="hidden"
					aria-labelledby="accordion-collapse-heading-1"
				>
					<div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
						<AddName />
					</div>
				</div>
			</div>
		</>
		)
	);
}
