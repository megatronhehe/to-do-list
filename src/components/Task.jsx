import React from "react";

import { FaTrashAlt } from "react-icons/fa";
import { BsSquare, BsFillCheckSquareFill } from "react-icons/bs";
import { TfiPencilAlt } from "react-icons/tfi";

const Task = ({ markTaskDone, id, done, name, deleteTask, setThisTodo }) => {
	const handleEditTaskName = (e) => {
		const { value } = e.target;
		setThisTodo((prev) => ({
			...prev,
			tasks: prev.tasks.map((task) =>
				task.id === id ? { ...task, name: value } : task
			),
		}));
	};

	return (
		<div className="bg-gray-100 p-2 mt-2 rounded-md flex justify-between items-center ">
			<div onClick={() => markTaskDone(id)} className="flex items-center gap-2">
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
				<button
					onClick={() => deleteTask(id)}
					className="p-2 bg-white rounded-md"
				>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
};

export default Task;
