import React, { useState } from "react";
import Rule from "./rule";
import { useSelector, useDispatch } from "react-redux";
import Collapsible from "react-collapsible";
function State({ id }) {
	const rules = useSelector((state) => state.reducer[`state${id}`]["rules"]);
	const dispatch = useDispatch();
	const handleRemoveState = () => {
		dispatch({ type: "removeState", payload: id });
	};
	const handleAddCase = () => {
		console.log("add case");
		dispatch({
			type: "addRule",
			payload: { stateNum: id },
		});
	};
	const getRulesArr = () => {
		let arr = Object.keys(rules);
		arr.push(arr.shift());
		return arr;
	};
	return (
		<div className="state">
			<div className="state-header">
				<div className="state-control">
					<button onClick={handleAddCase}>Add case</button>
					<button onClick={handleRemoveState}>Remove State</button>
				</div>
			</div>
			<Collapsible
				triggerStyle={{ margin: 0, padding: 0 }}
				trigger={<h2>{`State ${id}`}</h2>}
				overflowWhenOpen="visible"
				open={true}
			>
				{getRulesArr().map((locationRule) => {
					if (rules[locationRule]["action"] !== "noDisplay") {
						return <Rule id={id} locationRule={locationRule}></Rule>;
					}
					return "";
				})}
			</Collapsible>
		</div>
	);
}
export default State;
