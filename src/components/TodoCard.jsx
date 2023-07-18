import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TfiPencilAlt, TfiCheck, TfiTrash } from "react-icons/tfi";

const TodoCard = ({ id, title, tasks, date, setTodos }) => {
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
			prev.map((item) => (item.id === id ? { ...item, title: value } : item))
		);
	};

	const deleteTodo = (id, e) => {
		e.stopPropagation();
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
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

	return (
		<div className="relative p-2 text-sm bg-gray-100 rounded-lg">
			<Link to={`/${id}`}>
				<form>
					<input
						ref={inputRef}
						disabled={!toggleEdit}
						onChange={editTodoName}
						className={`outline-none text-base rounded-md w-full p-2 ${
							toggleEdit ? "bg-white" : "bg-gray-100 "
						}`}
						type="text"
						value={title}
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							setToggleEdit(false);
						}}
					></button>
				</form>
				<p className="mt-2 text-xs text-gray-400 ">5 / 7 tasks completed</p>
				<div className="mt-12 font-light tracking-wide text-end">
					<p>{day()}</p>
					<p>
						{date.getDate()} <span>{month()}</span>
					</p>
				</div>
			</Link>

			{!toggleEdit && (
				<button
					onClick={(e) => deleteTodo(id, e)}
					className="absolute p-2 text-xl text-white bg-red-300 rounded-md top-1 right-1"
				>
					<TfiTrash />
				</button>
			)}
			<button
				onClick={(e) => {
					e.stopPropagation();
					setToggleEdit((prev) => !prev);
				}}
				className="absolute p-3 text-xl text-gray-500 bg-white rounded-md bottom-1 left-1"
			>
				{toggleEdit ? <TfiCheck /> : <TfiPencilAlt />}
			</button>
		</div>
	);
};

export default TodoCard;
