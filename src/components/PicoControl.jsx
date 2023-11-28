import React, { useState } from "react";
import "../App.css";
import State from "./State";

import { useSelector, useDispatch } from "react-redux";
export default function PicoControl({ runGame }) {
	const states = useSelector((state) => state.reducer);
	const stateFilter = Object.keys(states).filter((element) => {
		if (element === "level") {
			return false;
		} else {
			return true;
		}
	});
	console.log(states);
	const dispatch = useDispatch();
	const handleAddState = () => {
		dispatch({
			type: "addState",
		});
	};
	return (
		<div className="ControlContainer">
			{stateFilter.map((state, index) => {
				return <State key={index} id={states[state]["stateNum"]} />;
			})}
			<div className="ControlRow NoBackground">
				<button className="AddControlRow" onClick={handleAddState}>
					Add Row
				</button>
			</div>
		</div>
	);
}
