import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TodosList from "./components/TodosList";
import TodoCard from "./components/TodoCard";
import TodoDetails from "./components/TodoDetails";

import { stringifyDate } from "./utils/stringfyDate";
import { createId } from "./utils/createId";

function App() {
	const initial_todo_state = {
		id: "",
		title: "",
		tasks: [],
		isCompleted: false,
		date: new Date(),
	};

	const storedTodos =
		localStorage.length > 0
			? JSON.parse(localStorage.getItem("todos")).map((todo) => ({
					...todo,
					date: new Date(todo.date),
			  }))
			: [];

	// STATES
	const [todos, setTodos] = useState(storedTodos);
	const [newTodoForm, setNewTodoForm] = useState(initial_todo_state);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	// ELEMENTS
	const TodosCardElement = todos.map((todo) => (
		<TodoCard
			key={todo.id}
			id={todo.id}
			title={todo.title}
			tasks={todo.tasks}
			date={todo.date}
			setTodos={setTodos}
		/>
	));

	return (
		<>
			<div className="flex justify-center h-screen py-8 text-gray-600 bg-gray-100">
				<div className="w-full max-w-xl ">
					<Header />
					<Routes>
						<Route
							path="/"
							element={
								<TodosList
									todos={todos}
									newTodoForm={newTodoForm}
									setNewTodoForm={setNewTodoForm}
									setTodos={setTodos}
									createId={createId}
									initial_todo_state={initial_todo_state}
								>
									{todos.length > 0 && TodosCardElement}
								</TodosList>
							}
						></Route>
						<Route
							path="/:id"
							element={
								<TodoDetails
									todos={todos}
									setTodos={setTodos}
									createId={createId}
									stringifyDate={stringifyDate}
								/>
							}
						></Route>
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
