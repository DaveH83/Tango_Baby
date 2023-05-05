import axios from "axios";

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

// loader function for swipe names page
export const nameListLoader = async()=>{
	try{
		let response =await axios.get('/app/name/');
		// console.log(response.data['unshown_list'])
		return response.data['unshown_list']
	} catch (e){
		console.error(e)
		return null
	}
    }