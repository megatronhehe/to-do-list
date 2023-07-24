import React, { useState, createContext } from "react";

const NotifContext = createContext();

const NotifContextProvider = ({ children }) => {
	const [showNotif, setShowNotif] = useState(false);
	const [notifMessage, setNotifMessage] = useState("");

	const setNotif = (message) => {
		setShowNotif(true);
		setNotifMessage(message);
		setTimeout(() => {
			setShowNotif(false);
			setNotifMessage("");
		}, 1500);
	};

	return (
		<NotifContext.Provider value={{ showNotif, setNotif, notifMessage }}>
			{children}
		</NotifContext.Provider>
	);
};

export { NotifContextProvider, NotifContext };
