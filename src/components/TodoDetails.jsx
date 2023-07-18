import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import { TfiPlus, TfiSharethisAlt } from "react-icons/tfi";

const TodoDetails = ({ todos, setTodos, createId }) => {
	const { id } = useParams();

	const isTodosExist = todos.length > 0;
	const foundTodo = isTodosExist && todos.find((item) => item.id === id);

	const [thisTodo, setThisTodo] = useState(foundTodo);
	const [taskForm, setTaskForm] = useState({
		id: "",
		name: "",
		done: false,
	});

	useEffect(() => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? thisTodo : todo)));
	}, [thisTodo]);

	const handleTaskForm = (e) => {
		const { value } = e.target;
		setTaskForm((prev) => ({ ...prev, name: value }));
	};

	const addTask = (e) => {
		e.preventDefault();

		const newTask = { ...taskForm, id: createId() };
		setThisTodo((prev) => ({
			...prev,
			tasks: [...prev.tasks, newTask],
		}));
	};

	console.log(todos);

	const tasksElement =
		isTodosExist &&
		thisTodo.tasks.map((task) => <h1 key={task.id}>{task.name}</h1>);

	return isTodosExist ? (
		<div className="relative w-full p-4 mt-8 bg-white rounded-xl ">
			<div className="relative flex items-center justify-center pb-2 border-b">
				<Link to="/" className="absolute left-0 flex items-center">
					<IoIosArrowBack />
					Back
				</Link>
				<h2 className="text-xl tracking-wide">{thisTodo.title}</h2>
			</div>

			<div className="flex items-center gap-1 mt-4">
				<form className="flex w-full h-12 gap-2 p-2 text-sm text-gray-400 bg-gray-100 rounded-lg">
					<input
						onChange={handleTaskForm}
						type="text"
						name="name"
						className="w-5/6 px-4 tracking-wide rounded-md"
						placeholder="add task name"
						value={taskForm.name}
					/>

					<button
						onClick={addTask}
						className="flex items-center justify-center w-1/6 text-white bg-green-300 rounded-md"
					>
						<TfiPlus />
					</button>
				</form>
			</div>
			{thisTodo.tasks.length > 0 && tasksElement}
		</div>
	) : (
		<p>doesnt exist</p>
	);
};

export default TodoDetails;
