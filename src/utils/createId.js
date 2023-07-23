export const createId = () => {
	const id = new Date();
	return `${id.getMilliseconds()}${id.getSeconds()}${id.getMinutes()}${id.getHours()}${id.getDate()}${id.getMonth()}${id.getFullYear()}`;
};
