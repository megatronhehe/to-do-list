import React from "react";

import { AiOutlineExclamationCircle } from "react-icons/ai";

const Notification = ({ notifMessage }) => {
	return (
		<div className="fixed left-0 flex justify-center w-full bottom-5">
			<div className="flex items-center gap-6 p-2 bg-white rounded-full shadow-md">
				<AiOutlineExclamationCircle className="text-2xl" />
				<p className="mr-2">{notifMessage}</p>
			</div>
		</div>
	);
};

export default Notification;
