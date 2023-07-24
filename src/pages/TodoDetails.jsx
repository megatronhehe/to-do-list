import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { TodosContext } from "../context/TodosContext";
import { NotifContext } from "../context/NotifContext";

import Task from "../components/Task";

import ErrorPage from "./ErrorPage";

import { stringifyDate } from "../utils/stringfyDate";
import { createId } from "../utils/createId";
import { countPercentage } from "../utils/countPercentage";
import { isFormEmpty } from "../utils/isFormEmpty";

import { IoIosArrowBack } from "react-icons/io";
import { TfiPencilAlt, TfiCheck } from "react-icons/tfi";
import { HiPlus } from "react-icons/hi";
import { BiCheckCircle, BiTask, BiCheck, BiX } from "react-icons/bi";

const TodoDetails = () => {
	const { todos, setTodos, editTodoName } = useContext(TodosContext);
	const { setNotif } = useContext(NotifContext);

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

	const markAllTaskDone = () => {
		setThisTodo((prev) => ({
			...prev,
			tasks: prev.tasks.map((task) => ({ ...task, done: true })),
		}));
	};

	const markAllTaskUndone = () => {
		setThisTodo((prev) => ({
			...prev,
			tasks: prev.tasks.map((task) => ({ ...task, done: false })),
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
					<div className="flex justify-between w-full px-4 py-6 text-lg text-gray-100 bg-gray-600 border rounded-lg">
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
				</div>

				<div className="flex items-start justify-end gap-2 text-xs text-white">
					<p className="text-gray-400">mark all tasks as :</p>
					<button
						onClick={markAllTaskDone}
						className="flex items-center justify-center w-1/4 gap-1 py-2 bg-green-400"
					>
						done <BiCheck className="text-base" />
					</button>
					<button
						onClick={markAllTaskUndone}
						className="flex items-center justify-center w-1/4 gap-1 py-2 bg-gray-400"
					>
						undone <BiX className="text-base" />
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
						onClick={
							!isFormEmpty(taskForm.name)
								? addTask
								: (e) => {
										e.preventDefault();
										setNotif("task form cannot be empty!");
								  }
						}
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
