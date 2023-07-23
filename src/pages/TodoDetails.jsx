import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { TodosContext } from "../context/TodosContext";

import Task from "../components/Task";

import ErrorPage from "./ErrorPage";

import { stringifyDate } from "../utils/stringfyDate";
import { createId } from "../utils/createId";
import { countPercentage } from "../utils/countPercentage";

import { IoIosArrowBack } from "react-icons/io";
import { TfiPencilAlt, TfiCheck } from "react-icons/tfi";
import { HiPlus } from "react-icons/hi";
import { BiCheckCircle, BiTask } from "react-icons/bi";
import { PiListChecks } from "react-icons/pi";

const TodoDetails = () => {
	const { todos, setTodos, editTodoName } = useContext(TodosContext);
	// initialization
	const inputRef = useRef(null);
	const { id } = useParams();

	const initial_task_state = {
		id: "",
		name: "",
		done: false,
	};

	const isTodosExist = todos.length > 0;
	const foundTodo = isTodosExist && todos.find((item) => item.id === id);

	// states
	const [toggleEdit, setToggleEdit] = useState(false);
	const [thisTodo, setThisTodo] = useState(foundTodo);
	const [taskForm, setTaskForm] = useState(initial_task_state);

	// useEffects update todos
	useEffect(() => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? thisTodo : todo)));
	}, [thisTodo]);

	// focus
	useEffect(() => {
		if (toggleEdit) {
			inputRef.current.focus();
		}
	}, [toggleEdit]);

	// functions
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
		setTaskForm(initial_task_state);
	};

	const toggleAllTaskDone = () => {
		setThisTodo((prev) => ({
			...prev,
			tasks: prev.tasks.map((task) => ({ ...task, done: !task.done })),
		}));
	};

	// element
	const tasksElement =
		isTodosExist &&
		thisTodo.tasks.map((task) => (
			<Task
				key={task.id}
				id={task.id}
				done={task.done}
				name={task.name}
				setThisTodo={setThisTodo}
			/>
		));

	// variables
	const countTaskDone = thisTodo.tasks.filter((task) => task.done).length;

	const { day, month } = thisTodo && stringifyDate(thisTodo.date);

	const isAllTasksDone =
		thisTodo.tasks.length > 0 && countTaskDone / thisTodo.tasks.length === 1;

	return isTodosExist ? (
		<div className="relative w-full p-4 mt-8 bg-white rounded-xl ">
			<div className="relative flex items-center justify-center pb-2 border-b">
				<Link to="/" className="absolute left-0 flex items-center">
					<IoIosArrowBack />
					Back
				</Link>
				<form>
					<input
						ref={inputRef}
						disabled={!toggleEdit}
						onChange={(e) => editTodoName(thisTodo.id, e)}
						type="text"
						className={`text-xl tracking-wide text-center outline-none border rounded-full border-white ${
							toggleEdit ? "bg-gray-100" : "bg-white"
						}`}
						value={foundTodo.title}
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							setToggleEdit((prev) => !prev);
						}}
						className="absolute right-0 flex items-center top-1"
					>
						{toggleEdit ? <TfiCheck /> : <TfiPencilAlt />}
					</button>
				</form>
			</div>

			<div className="flex flex-col gap-2 my-4">
				<div className="flex gap-2">
					<div className="flex justify-between w-4/5 px-4 py-6 text-lg text-gray-100 bg-gray-600 border rounded-lg">
						<div className="text-center">
							<p className="flex items-center gap-2 mb-4">
								<BiTask />
								{countTaskDone}/{thisTodo.tasks.length}{" "}
								<span className="flex text-xs">tasks completed</span>
							</p>
							{isAllTasksDone ? (
								<p className="flex items-center gap-2 text-sm text-green-400">
									fully completed! <BiCheckCircle className="text-xl" />
								</p>
							) : (
								<p className="flex items-center text-sm font-semibold">
									{countTaskDone < 1
										? "0"
										: countPercentage(countTaskDone, thisTodo.tasks.length)}
									% progress
								</p>
							)}
						</div>
						<div className="pl-4 font-light border-l">
							<p>{day},</p>
							<p className="text-sm">
								{thisTodo.date.getDate()} {month}
							</p>
						</div>
					</div>

					<button
						onClick={toggleAllTaskDone}
						className={`px-1 flex flex-col items-center justify-around w-1/5 text-xs  rounded-md ${
							isAllTasksDone
								? "text-gray-600 bg-gray-300"
								: "text-white bg-green-400"
						}`}
					>
						<PiListChecks className="text-4xl " />
						<p className="">
							mark all tasks as{" "}
							<span className="font-semibold tracking-wide">
								{isAllTasksDone ? "not done" : "done"}
							</span>
						</p>
					</button>
				</div>
				<form className="flex h-12 gap-2 p-2 text-sm text-gray-400 bg-gray-100 rounded-lg">
					<input
						onChange={handleTaskForm}
						type="text"
						name="name"
						className="w-5/6 px-4 tracking-wide rounded-md"
						placeholder="add task name"
						value={taskForm.name}
					/>

					<button
						disabled={!taskForm.name}
						onClick={addTask}
						className="flex items-center justify-center w-1/6 text-white bg-green-300 rounded-full cursor-pointer"
					>
						<HiPlus />
					</button>
				</form>
			</div>
			{thisTodo.tasks.length > 0 ? (
				tasksElement
			) : (
				<p className="my-8 text-sm text-center text-gray-400">
					no task listed yet
				</p>
			)}
		</div>
	) : (
		<ErrorPage />
	);
};

export default TodoDetails;
