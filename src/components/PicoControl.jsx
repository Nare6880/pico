import React, { Component, useState } from "react";
import "../App.css";
import State from "./State";
export default function PicoControl() {
	const [states, setStates] = useState([1, 2]);
	const addState = () => {
		setStates([...states, states.length + 1]);
	};
	const removeState = (index) => {
		setStates(
			states
				.slice(0, index)
				.concat(index == states.length - 1 ? [] : states.slice(index + 1))
		);
	};
	return (
		<div className="ControlContainer">
			{states.map((state, index) => {
				return <State states = {states} id={state} removeState={removeState} />;
			})}
			<div className="ControlRow NoBackground">
				<button className="AddControlRow" onClick={addState}>
					Add Row
				</button>
			</div>
		</div>
	);
}
