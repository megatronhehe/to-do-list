import React from "react";

import { FaTrashAlt } from "react-icons/fa";
import { BsSquare, BsFillCheckSquareFill } from "react-icons/bs";
import { TfiPencilAlt } from "react-icons/tfi";

const Task = ({ id, done, name, setThisTodo }) => {
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
		<div className="bg-gray-100 p-2 mt-2 rounded-md flex justify-between items-center ">
			<div onClick={markTaskDone} className="flex items-center gap-2">
				<p>
					{done ? (
						<BsFillCheckSquareFill className="text-green-400" />
					) : (
						<BsSquare />
					)}
				</p>
				<input
					onChange={handleEditTaskName}
					type="text"
					name="name"
					value={name}
				/>
			</div>
			<div className="flex gap-2">
				<button className="p-2 bg-white rounded-md">
					<TfiPencilAlt />
				</button>
				<button onClick={deleteTask} className="p-2 bg-white rounded-md">
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default Task;
