import { useState } from "react";

import Header from "./components/Header";
import TodosList from "./components/TodosList";
import TodoCard from "./components/TodoCard";
import TodoDetails from "./components/TodoDetails";

import { Routes, Route } from "react-router-dom";

function App() {
	const initial_form_state = {
		id: "",
		todo: "",
		tasks: [{}],
		isCompleted: false,
		date: new Date(),
	};

	// STATES
	const [todos, setTodos] = useState([]);
	const [newTodoForm, setNewTodoForm] = useState(initial_form_state);

	// ELEMENTS
	const TodosCardElement = todos.map((todo) => (
		<TodoCard
			key={todo.id}
			id={todo.id}
			todo={todo.todo}
			task={todo.task}
			date={todo.date}
			setTodos={setTodos}
		/>
	));

	return (
		<>
			<div className="text-gray-600  h-screen flex justify-center bg-gray-100 py-8">
				<div className="max-w-xl w-full ">
					<Header />
					<Routes>
						<Route
							path="/"
							element={
								<TodosList
									newTodoForm={newTodoForm}
									setNewTodoForm={setNewTodoForm}
									setTodos={setTodos}
									initial_form_state={initial_form_state}
								>
									{todos.length > 0 && TodosCardElement}
								</TodosList>
							}
						></Route>
						<Route path="/:id" element={<TodoDetails todos={todos} />}></Route>
					</Routes>
				</div>

				{/* modal */}
			</div>
		</>
	);
}

export default App;
