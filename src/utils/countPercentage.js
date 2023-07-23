export const countPercentage = (tasksDone, tasksLength) => {
	return ((tasksDone / tasksLength) * 100).toFixed();
};
