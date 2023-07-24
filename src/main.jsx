import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { TodosContextProvider } from "./context/TodosContext";
import { NotifContextProvider } from "./context/NotifContext";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<NotifContextProvider>
		<TodosContextProvider>
			<Router>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</Router>
		</TodosContextProvider>
	</NotifContextProvider>
);
