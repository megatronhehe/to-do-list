import React from "react";

import { FaTrashAlt } from "react-icons/fa";
import { BsSquare, BsFillCheckSquareFill } from "react-icons/bs";
import { TfiPencilAlt } from "react-icons/tfi";

const Task = ({ markTaskDone, id, done, name, deleteTask }) => {
	return (
		<div className="bg-gray-100 p-2 mt-2 rounded-md flex justify-between items-center ">
			<div className="flex items-center gap-2">
				<button onClick={() => markTaskDone(id)}>
					{done ? (
						<BsFillCheckSquareFill className="text-green-400" />
					) : (
						<BsSquare />
					)}
				</button>
				<h1 className="text-base">{name}</h1>
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
