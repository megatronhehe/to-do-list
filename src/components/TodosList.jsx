import { TfiPlus } from "react-icons/tfi";

const TodosList = ({
	children,
	newTodoForm,
	setNewTodoForm,
	setTodos,
	initial_form_state,
}) => {
	const createId = () => {
		const id = new Date();
		return `${id.getMilliseconds()}${id.getSeconds()}${id.getMinutes()}${id.getHours()}${id.getDate()}${id.getMonth()}${id.getFullYear()}`;
	};

	const handleCreateTodo = (e) => {
		const { name, value } = e.target;
		setNewTodoForm((prev) => ({ ...prev, id: createId(), [name]: value }));
	};

	const addNewTodo = (e) => {
		e.preventDefault();
		setTodos((prev) => [...prev, newTodoForm]);
		setNewTodoForm(initial_form_state);
	};

	return (
		<div className="relative mt-8 p-4 rounded-xl w-full bg-white ">
			<div className="flex justify-between items-center border-b pb-2">
				<h2 className="text-xl tracking-wide">Select Todos</h2>
			</div>

			<div className="flex items-center gap-1 mt-4">
				<form className="p-2  h-12 text-sm text-gray-400 rounded-lg w-full flex gap-2 bg-gray-100">
					<input
						onChange={handleCreateTodo}
						type="text"
						name="todo"
						value={newTodoForm.todo}
						className="rounded-md px-4 tracking-wide w-5/6"
						placeholder="todo name"
					/>

					<button
						onClick={addNewTodo}
						disabled={!newTodoForm.todo}
						className="bg-green-300 text-white w-1/6 flex justify-center items-center rounded-md"
					>
						<TfiPlus />
					</button>
				</form>
			</div>

			<div className="mt-4 grid grid-cols-2  gap-4 w-full ">{children}</div>
		</div>
	);
};

export default TodosList;
