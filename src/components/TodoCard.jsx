import React from "react";
import { IoTrashBin } from "react-icons/io5";
import { TfiPencilAlt } from "react-icons/tfi";

const TodoCard = ({ id, todo, task, date, setTodos }) => {
	const day = () => {
		const weekday = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		return weekday[date.getDay()];
	};

	const month = () => {
		const month = [
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
		return month[date.getMonth()];
	};

	const deleteTodo = (id) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	return (
		<div className="relative bg-gray-100 text-sm p-4 rounded-lg">
			<h3 className="text-base">{todo}</h3>
			<p className=" text-gray-400 text-xs">5 / 7 tasks completed</p>
			<div className="text-end mt-12 font-light tracking-wide">
				<p>{day()}</p>
				<p>
					{date.getDate()} <span>{month()}</span>
				</p>
			</div>
			<button
				onClick={() => deleteTodo(id)}
				className="absolute top-1 right-1 text-xl text-red-400 bg-white p-2 rounded-md"
			>
				<IoTrashBin />
			</button>
			<button className="absolute bottom-1 left-1 text-xl text-gray-500 bg-white p-4 rounded-md">
				<TfiPencilAlt />
			</button>
		</div>
	);
};

export default TodoCard;
