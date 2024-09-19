import axios from 'axios';

export const apiRequest = async (method, url, data = '', cred = true) => {
	const token = JSON.parse(localStorage.getItem('loggedIn'));
	const tokenID = token !== undefined && token ? '/' + token.token : '';

	url = `${process.env.REACT_APP_NODE_HOST_APP}` + url + `${tokenID}`;
	// console.log(url, cred);
	return await axios({
		method,
		url,
		data: data !== '' ? data : null,
		withCredentials: cred,
		crossDomain: true,
	});
};
