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
	const [toShowList,setToShowList]=useState(nameList.slice(0,2)); 	
	const {uuid}=useParams();
	const {children} = useContext(UserContext)

	//handler for swiping name card
	const onSwipe = (name, direction) => {
		console.log("You swiped: " + direction);
		// Update liked based on swipe direction
		if (direction === "right") {
			swipeHandler(name, uuid, true);
		} else if (direction === "left") {
			swipeHandler(name, uuid, false);
		}
	}

	//handler for clicking icon 
	const onClick = (name,button) => {
		if(button==='right'){
			swipeHandler(name,uuid,true);
			setToShowList((prevList) => prevList.slice(0, -1));
			console.log(toShowList)
		}
		else if(button==='left'){
			swipeHandler(name,uuid,false);
			setToShowList((prevList) => prevList.slice(0, -1));
			console.log(toShowList)
	}}
	//working on this, its not working yet
	useEffect(async()=>{
		if (toShowList.length===0){ 
			console.log("noname to swipe")
			const newlist=await nameListLoader(uuid)
			console.log(newlist)
			setToShowList(newlist.slice(0,2))
		}
	},[toShowList.length])
	if (!toShowList){
        return (<div>Loading...</div>);
    }
	return (
		children && ( 
			<div className="card-container" >
			<AddName />
			{toShowList.map((name)=> (
				<div className='single-card'>
					<TinderCard className='tinder_card' onSwipe={(dir) => onSwipe(name, dir)} preventSwipe={['up', 'down']}>
							<p className='name-holder' key={name.id}>{name.name}</p>
					</TinderCard> 
					<div className='icons'>
						<button onClick={()=>onClick(name,'left')}>
							<HeartBrokenIcon fontSize="large"/>
						</button>
						<button onClick={()=>onClick(name, 'right')}>
							<FavoriteIcon fontSize="large"/>
						</button>
					</div>
				</div>
			)	
			)}
			</div>
		)
		
			
	
	);
}
