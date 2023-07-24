import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<Link to="/">
			<div className="py-8 text-center bg-white rounded-lg">
				<h1 className="text-2xl font-thin ">
					<span className="font-semibold tracking-wide">ToDos</span> List
				</h1>
			</div>
		</Link>
	);
};

export default Header;
