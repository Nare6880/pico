import { React, useState } from "react";
import "../App.css";
function Rule({ updateRule, key, data }) {
	const [state, setState] = useState(key !== "default" ? key : "");
	const [action, setAction] = useState(data !== "noDisplay" ? data : "");
	return (
		<div className="rule">
			<p>case:</p>
			<select
				id="case"
				onChange={(e) => {
					if (e.target.value !== "" && action !== "") {
						updateRule(state, action);
					}
					setState(e.target.value);
				}}
			>
				<option value={""}>Select</option>
				<option value={"Naaa"}>N***</option>
				<option value={"aSaa"}>*S**</option>
				<option value={"aaEa"}>**E*</option>
				<option value={"aaaW"}>***W</option>
			</select>
			<p>action:</p>
			<select
				id="action"
				onChange={(e) => {
					if (state !== "" && e.target.value !== "") {
						updateRule(state, e.target.value);
					}
					setAction(e.target.value);
				}}
			>
				<option value={""}>Select</option>
				<option value={"N"}>N</option>
				<option value={"S"}>S</option>
				<option value={"E"}>E</option>
				<option value={"W"}>W</option>
			</select>
		</div>
	);
}

export default Rule;
