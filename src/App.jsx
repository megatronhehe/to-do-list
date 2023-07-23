import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TodoCard from "./components/TodoCard";
import Container from "./components/Container";

import TodoDetails from "./pages/TodoDetails";
import TodosList from "./pages/TodosList";

import { TodosContext } from "./context/TodosContext";

function App() {
	// TodosContext
	const { todos } = useContext(TodosContext);

	// ELEMENTS
	const TodosCardElement = todos.map((todo) => (
		<TodoCard
			key={todo.id}
			id={todo.id}
			title={todo.title}
			tasks={todo.tasks}
			date={todo.date}
		/>
	));

	return (
		<>
			<Container>
				<Header />
				<Routes>
					<Route
						path="/"
						element={
							<TodosList>{todos.length > 0 && TodosCardElement}</TodosList>
						}
					></Route>
					<Route path="/:id" element={<TodoDetails />}></Route>
				</Routes>
			</Container>
		</>
	);
}

export default App;
