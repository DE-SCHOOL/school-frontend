import axios from 'axios';

export const apiRequest = async (method, url, data = '') => {
	url =
		`${process.env.REACT_APP_NODE_HOST_APP}` +
		url;
	console.log(url);
	return await axios({
		method,
		url,
		data: data !== '' ? data : null,
		withCredentials: true,
	});
};
