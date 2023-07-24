import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TodoCard from "./components/TodoCard";
import Container from "./components/Container";
import Notification from "./components/Notification";

import TodoDetails from "./pages/TodoDetails";
import TodosList from "./pages/TodosList";

import { TodosContext } from "./context/TodosContext";

function App() {
	const [showNotif, setShowNotif] = useState(false);
	const [notifMessage, setNotifMessage] = useState("");

	const { todos } = useContext(TodosContext);

	const setNotif = (message) => {
		setShowNotif(true);
		setNotifMessage(message);
		setTimeout(() => {
			setShowNotif(false);
			setNotifMessage("");
		}, 3000);
	};

	// ELEMENT
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
							<TodosList setNotif={setNotif}>
								{todos.length > 0 && TodosCardElement}
							</TodosList>
						}
					></Route>
					<Route
						path="/:id"
						element={<TodoDetails setNotif={setNotif} />}
					></Route>
				</Routes>

				{showNotif ? <Notification notifMessage={notifMessage} /> : ""}
			</Container>
		</>
	);
}

export default App;
