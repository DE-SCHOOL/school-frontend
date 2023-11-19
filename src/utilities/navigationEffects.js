
const HandleNavEffects = (item, dispatcher, actionCreator, navigate) => {
	if (item === 'logout') {
		dispatcher(actionCreator());
		navigate('/auth/signin');
	}
};

export default HandleNavEffects;
