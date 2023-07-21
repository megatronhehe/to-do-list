import React, { useState, useRef, useEffect } from "react";

import { FaTrashAlt } from "react-icons/fa";
import { BsSquare, BsFillCheckSquareFill } from "react-icons/bs";
import { TfiPencilAlt, TfiCheck } from "react-icons/tfi";

const Task = ({ id, done, name, setThisTodo }) => {
	const [toggleEdit, setToggleEdit] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		if (toggleEdit) {
			inputRef.current.focus();
		}
	}, [toggleEdit]);

	const handleEditTaskName = (e) => {
		const { value } = e.target;
		setThisTodo((prev) => ({
			...prev,
			tasks: prev.tasks.map((task) =>
				task.id === id ? { ...task, name: value } : task
			),
		}));
	};

	const markTaskDone = () => {
		setThisTodo((prev) => ({
			...prev,
			tasks: prev.tasks.map((task) =>
				task.id === id ? { ...task, done: !task.done } : task
			),
		}));
	};

	const deleteTask = () => {
		setThisTodo((prev) => ({
			...prev,
			tasks: prev.tasks.filter((task) => task.id !== id),
		}));
	};

	return (
		<div className="flex items-center justify-between p-2 mt-2 bg-gray-100 rounded-md ">
			<div className="flex items-center w-full gap-2 pr-2">
				<button onClick={markTaskDone}>
					{done ? (
						<BsFillCheckSquareFill className="text-green-400" />
					) : (
						<BsSquare />
					)}
				</button>
				<form className="w-full">
					<input
						ref={inputRef}
						disabled={!toggleEdit}
						className={`px-2 py-1 rounded-md w-full outline-none ${
							toggleEdit ? "bg-white" : "bg-gray-100"
						}`}
						onChange={handleEditTaskName}
						type="text"
						name="name"
						value={name}
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							setToggleEdit(false);
						}}
					></button>
				</form>
			</div>
			<div className="flex gap-2">
				<button
					onClick={() => setToggleEdit((prev) => !prev)}
					className="p-2 bg-white rounded-md"
				>
					{toggleEdit ? <TfiCheck /> : <TfiPencilAlt />}
				</button>
				<button onClick={deleteTask} className="p-2 bg-white rounded-md">
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default Task;
