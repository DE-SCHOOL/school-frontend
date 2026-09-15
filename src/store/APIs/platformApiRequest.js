import axios from 'axios';

// Mirrors apiRequest.js exactly, but reads the platform session from its
// own localStorage key ('platformLoggedIn') instead of 'loggedIn' — a
// platform super-admin and a school staff member are authenticated
// against entirely separate backend collections/JWT secrets (see
// controllers/platform/platform_auth.controller.js), so their sessions
// must never share a key: a browser tab that's both logged into a
// school AND the platform console must send the right token to each.
export const platformApiRequest = async (method, url, data = '', cred = true) => {
	const token = JSON.parse(localStorage.getItem('platformLoggedIn'));
	const tokenID = token !== undefined && token ? '/' + token.token : '';

	url = `${import.meta.env.VITE_NODE_HOST_APP}` + url + `${tokenID}`;

	return await axios({
		method,
		url,
		data: data !== '' ? data : null,
		withCredentials: cred,
		crossDomain: true,
	});
};
