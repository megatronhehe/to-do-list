import React from "react";

const Container = ({ children }) => {
	return (
		<div className="flex justify-center h-screen py-8 text-gray-600 bg-gray-100">
			<div className="w-full max-w-xl ">{children}</div>
		</div>
	);
};

export default Container;
