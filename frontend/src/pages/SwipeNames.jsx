import {useLoaderData,useParams} from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { swipeHandler } from '../Utilities/Utilities';

export default function SwipeNames() {
	const nameList=useLoaderData();
	const show_list=nameList.slice(0,100) 	
	const {uuid}=useParams();

	//code for Tinder card
	const onSwipe = (name, direction) => {
		console.log('You swiped: ' + direction)
		// Update liked based on swipe direction
		if(direction==='right'){
			swipeHandler(name,uuid,true)
		}
		else if(direction==='left'){
			swipeHandler(name,uuid,false)
		}

	}

	return (
		<div className="card-container">
			{show_list.map((name)=> (
				<div className='single-card'>
					<TinderCard className='tinder_card' onSwipe={(dir) => onSwipe(name, dir)} preventSwipe={['up', 'down']}>
							<p className='name-holder' key={name.id}>{name.name}</p>

					</TinderCard>
					
				</div>
			)	
			)}
			{/* <div className='icons'>
							<IconButton className="swipeButtons__right">
								<FavoriteIcon fontSize="large"/>
							</IconButton>
							<IconButton className="swipeButtons__right">
								<HeartBrokenIcon fontSize="large"/>
							</IconButton>
			</div> */}
			</div>
			
	
	);
}
