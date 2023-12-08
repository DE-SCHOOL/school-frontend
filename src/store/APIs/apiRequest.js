import axios from 'axios';

export const apiRequest = async (method, url, data = '', cred = true) => {
	url =
		`${process.env.REACT_APP_NODE_HOST_APP}:${process.env.REACT_APP_NODE_PORT}` +
		url;
	console.log(url, cred);
	return await axios({
		method,
		url,
		data: data !== '' ? data : null,
		withCredentials: cred,
	});
};
