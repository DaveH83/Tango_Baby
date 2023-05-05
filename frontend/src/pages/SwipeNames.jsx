import { useState } from 'react';
import {useLoaderData} from 'react-router-dom';
import AddName from '../components/AddName';
import TinderCard from 'react-tinder-card';

export default function SwipeNames() {
	const nameList=useLoaderData();
	// const [nameList,setNameList]=useState([]);
	const [liked,setLiked]=useState([]);
	const [unlike, setUnliked]=useState([]);
	const shortList=nameList.slice(0,1000)

	const swiped = (direction, nameToDelete) => {
		console.log('removing: ' + nameToDelete)
		setLastDirection(direction)
	  }
	
	  const outOfFrame = (name) => {
		console.log(name + ' left the screen!')
	  }
	return (
		<div>
			
			{nameList.map((name)=> (
				<TinderCard>
					<div className='name-holder'>
						<p key={name.id}>{name.name}</p>
					</div>
				</TinderCard>
			)	
			)}
			
			
		
		</div>
	);
}
