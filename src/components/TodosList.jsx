import { TfiPlus } from "react-icons/tfi";

const TodosList = ({
	children,
	todos,
	newTodoForm,
	setNewTodoForm,
	setTodos,
	createId,
	initial_todo_state,
}) => {
	const handleCreateTodo = (e) => {
		const { name, value } = e.target;
		setNewTodoForm((prev) => ({ ...prev, id: createId(), [name]: value }));
	};

	const addNewTodo = (e) => {
		e.preventDefault();
		setTodos((prev) => [newTodoForm, ...prev]);
		setNewTodoForm(initial_todo_state);
	};

	return (
		<div className="relative w-full p-4 mt-8 bg-white rounded-xl ">
			<div className="flex items-center justify-center pb-2 border-b">
				<h2 className="text-xl tracking-wide border border-white">
					Your Todos
				</h2>
			</div>

			<div className="flex items-center gap-1 mt-4">
				<form className="flex w-full h-12 gap-2 p-2 text-sm text-gray-400 bg-gray-100 rounded-lg">
					<input
						onChange={handleCreateTodo}
						type="text"
						name="title"
						value={newTodoForm.title}
						className="w-5/6 px-4 tracking-wide rounded-md"
						placeholder="what are you going to do today?"
					/>

					<button
						onClick={addNewTodo}
						disabled={!newTodoForm.title}
						className="flex items-center justify-center w-1/6 text-white bg-green-300 rounded-md"
					>
						<TfiPlus />
					</button>
				</form>
			</div>

			{todos.length > 0 ? (
				<div className="grid w-full grid-cols-2 gap-4 mt-4 ">{children}</div>
			) : (
				<div className="my-20 text-sm text-center text-gray-400">
					<p>you have no todos yet . .</p>
				</div>
			)}
		</div>
	);
};

export default TodosList;
