import React, { createContext } from "react";

const TodosContext = createContext();

const TodosContextProvider = ({ children }) => {
	return <TodosContext.Provider value={{}}>{children}</TodosContext.Provider>;
};

export { TodosContextProvider, TodosContext };
