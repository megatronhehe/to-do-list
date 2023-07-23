export const stringifyDate = (date) => {
	const dayNumber = date.getDay();
	const monthNumber = date.getMonth();
	const weekdayArray = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const monthArray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return { day: weekdayArray[dayNumber], month: monthArray[monthNumber] };
};
