import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<Link to="/">
			<div className="bg-white rounded-lg text-center py-8">
				<h1 className="font-thin text-2xl ">
					<span className="font-semibold tracking-wide">ToDos</span> List
				</h1>
			</div>
		</Link>
	);
};

export default Header;
