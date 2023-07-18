import React from "react";
import { useParams, Link } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

const TodoDetails = ({ todos }) => {
	const { id } = useParams();

	const thisTodo = todos.length > 0 && todos.find((item) => item.id === id);

	return (
		<div className="relative mt-8 p-4 rounded-xl w-full bg-white ">
			<div className="relative flex justify-center items-center border-b pb-2">
				<Link to="/" className="absolute left-0 flex items-center">
					<IoIosArrowBack />
					Back
				</Link>
				<h2 className="text-xl tracking-wide">{thisTodo.todo}</h2>
			</div>
		</div>
	);
};

export default TodoDetails;
