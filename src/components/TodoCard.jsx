import React, { useState, useRef, useEffect } from "react";
import { TfiPencilAlt, TfiCheck, TfiTrash } from "react-icons/tfi";

const TodoCard = ({ id, todo, task, date, setTodos }) => {
	const [toggleEdit, setToggleEdit] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		if (toggleEdit) {
			inputRef.current.focus();
		}
	}, [toggleEdit]);

	const editTodoName = (e) => {
		const { value } = e.target;
		setTodos((prev) =>
			prev.map((item) => (item.id === id ? { ...item, todo: value } : item))
		);
	};
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
		<div className="relative bg-gray-100 text-sm p-2 rounded-lg">
			<form>
				<input
					ref={inputRef}
					disabled={!toggleEdit}
					onChange={editTodoName}
					className={`outline-none text-base rounded-md w-full p-2 ${
						toggleEdit ? "bg-white" : "bg-gray-100 "
					}`}
					type="text"
					value={todo}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						setToggleEdit(false);
					}}
				></button>
			</form>
			<p className=" text-gray-400 text-xs mt-2">5 / 7 tasks completed</p>
			<div className="text-end mt-12 font-light tracking-wide">
				<p>{day()}</p>
				<p>
					{date.getDate()} <span>{month()}</span>
				</p>
			</div>

			{!toggleEdit && (
				<button
					onClick={() => deleteTodo(id)}
					className="absolute top-1 right-1 text-xl  bg-red-300 p-2 rounded-md text-white"
				>
					<TfiTrash />
				</button>
			)}
			<button
				onClick={() => setToggleEdit((prev) => !prev)}
				className="absolute bottom-1 left-1 text-xl text-gray-500 bg-white p-3 rounded-md"
			>
				{toggleEdit ? <TfiCheck /> : <TfiPencilAlt />}
			</button>
		</div>
	);
};

export default TodoCard;
