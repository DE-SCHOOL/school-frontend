import axios from 'axios';

export const apiRequest = async (method, url, data = '') => {
	url = `${process.env.REACT_APP_NODE_HOST_DEV}:${process.env.REACT_APP_NODE_PORT}` +
	 url;
	console.log(url);
	return await axios({
		method,
		url,
		data: data !== '' ? data : null,
		withCredentials: true,
	});
};
