import React, { useState } from "react";
import Rule from "./rule";
function State({ id, removeState }) {
	const [rules, setRules] = useState({});
	const addCase = () => {
		let tempRule = { ...rules };
		tempRule["default"] = null;
		setRules(tempRule);
	};
	const updateRule = (state, action) => {
		let tempRule = { ...rules };
		tempRule[state] = action;
		tempRule.default = "noDisplay";
		console.log(tempRule);
		setRules(tempRule);
	};
	return (
		<div className="state">
			<div className="state-header">
				<h2>State {id}</h2>
				<div className="state-control">
					<button onClick={addCase}>Add case</button>
					<button onClick={() => removeState(id - 1)}>Remove State</button>
				</div>
				{Object.keys(rules).map((key, index) => {
					return rules[key] !== "noDisplay" ? (
						<Rule key={key} data={rules[key]} updateRule={updateRule}></Rule>
					) : (
						""
					);
				})}
			</div>
		</div>
	);
}
export default State;
