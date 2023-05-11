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

	//handler for swiping name card
	const onSwipe = (name, direction) => {
		// Update liked based on swipe direction
		if (direction === "right") {
			swipeHandler(name, uuid, true);
			console.log('swipe right')
			setListLength(preLength=>preLength-1)
		} else if (direction === "left") {
			swipeHandler(name, uuid, false);
			console.log('swipe left')
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
		children && (
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
			<AddName />
			</div>
		)
	);
}
