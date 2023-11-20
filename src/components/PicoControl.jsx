import React, { useState } from "react";
import "../App.css";
import State from "./State";

import { useSelector, useDispatch } from "react-redux";
export default function PicoControl({ runGame }) {
	const states = useSelector((state) => state.reducer);
	console.log(states);
	const dispatch = useDispatch();
	const handleAddState = () => {
		dispatch({
			type: "addState",
		});
	};
	return (
		<div className="ControlContainer">
			{Object.keys(states).map((state, index) => {
				return (
					<State key={index} states={states} id={states[state]["stateNum"]} />
				);
			})}
			<div className="ControlRow NoBackground">
				<button className="AddControlRow" onClick={handleAddState}>
					Add Row
				</button>
				<button className="AddControlRow" onClick={runGame}>
					Run
				</button>
			</div>
		</div>
	);
}
