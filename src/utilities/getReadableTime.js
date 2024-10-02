export const getReadableTime = (givenTime) => {
	const now = new Date(givenTime);

	// Get hours and minutes
	let hours = now.getHours();
	let minutes = now.getMinutes();

	// Add leading zeros if necessary
	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	// Return formatted time string
	return `${hours}:${minutes}`;
};
