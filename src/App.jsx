import { useState } from "react";

import Header from "./components/Header";
import TodosList from "./components/TodosList";
import TodoCard from "./components/TodoCard";
import TodoDetails from "./components/TodoDetails";

import { Routes, Route } from "react-router-dom";

function App() {
	const initial_form_state = {
		id: "",
		title: "",
		tasks: [],
		isCompleted: false,
		date: new Date(),
	};

	// STATES
	const [todos, setTodos] = useState([]);
	const [newTodoForm, setNewTodoForm] = useState(initial_form_state);

	// functions
	const createId = () => {
		const id = new Date();
		return `${id.getMilliseconds()}${id.getSeconds()}${id.getMinutes()}${id.getHours()}${id.getDate()}${id.getMonth()}${id.getFullYear()}`;
	};

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
									initial_form_state={initial_form_state}
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
								/>
							}
						></Route>
					</Routes>
				</div>

				{/* modal */}
			</div>
		</>
	);
}

export default App;
