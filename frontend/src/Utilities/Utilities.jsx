import axios from 'axios';

export const handleCSRF = () => {
	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	const csrftoken = getCookie("csrftoken");
	axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
};


export const nameListLoader = async (uuid) => {
	try{
		const response= await axios.put(`/app/name/`,{
			'uuid':uuid
		}
		
		)
		return response.data['unshown_list']
	  
	} catch (e){
		console.error(e)
		return null
	}  
	
};


export const swipeHandler = async(name,uuid,liked)=> {
	try{
		const response= await axios.post('/app/swipe/',{
			'name':name,//name dict from swipe card
			'uuid':uuid,//parent_url
			'liked':liked 
	})
		console.log('swipeHandler are called')
		return response.data
	  
	} catch (e){
		console.error(e)
		return null
	}  
	
};


export const updateChild = (uuid, nickname, parent2, lastname, due_date) => {

	const response = axios.put(`/app/child/${uuid}`, {
		
		'nickname': nickname,
		'parent2': parent2,
		'lastname': lastname,
		'due_date': due_date,
	})

	console.log(uuid, nickname, parent2, lastname, due_date)

	return {'task':'success'}
}

