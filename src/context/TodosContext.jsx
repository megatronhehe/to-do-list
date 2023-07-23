import React, { createContext, useState, useEffect } from "react";

import { createId } from "../utils/createId";

const TodosContext = createContext();

const TodosContextProvider = ({ children }) => {
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

	// Form function
	const handleCreateTodo = (e) => {
		const { name, value } = e.target;
		setNewTodoForm((prev) => ({ ...prev, id: createId(), [name]: value }));
	};

	// functions
	const addNewTodo = (e) => {
		e.preventDefault();
		setTodos((prev) => [newTodoForm, ...prev]);
		setNewTodoForm(initial_todo_state);
	};

	const editTodoName = (id, e) => {
		const { value } = e.target;
		setTodos((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todo, title: value } : todo))
		);
	};

	const deleteTodo = (id, e) => {
		e.stopPropagation();
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	return (
		<TodosContext.Provider
			value={{
				initial_todo_state,
				storedTodos,
				todos,
				setTodos,
				newTodoForm,
				setNewTodoForm,
				handleCreateTodo,
				addNewTodo,
				editTodoName,
				deleteTodo,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
};

export { TodosContextProvider, TodosContext };
