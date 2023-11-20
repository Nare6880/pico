import { React, useState } from "react";
import Select from "react-select";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
function Rule({ id, locationRule }) {
	var stateString = locationRule === "default" ? "aaaa" : locationRule;
	const [state, setState] = useState(stateString.split(""));
	const directions = ["N", "S", "E", "W"];

	var action = useSelector(
		(state) => state.reducer[`state${id}`]["rules"][locationRule]["action"]
	);
	var finishState = useSelector(
		(state) => state.reducer[`state${id}`]["rules"][locationRule]["finishState"]
	);
	const states = useSelector((state) => state.reducer);
	const rules = useSelector((state) => state.reducer[`state${id}`]["rules"]);
	const dispatch = useDispatch();
	var actionOptions = [
		{ value: "display", label: "Select" },
		{ value: "N", label: "N" },
		{ value: "S", label: "S" },
		{ value: "E", label: "E" },
		{ value: "W", label: "W" },
	];
	var statesArr = Array.from(
		Object.keys(states).map((Element) => {
			return { value: `${Element}`, label: `${Element}` };
		})
	);

	const getFinishState = () => {
		var elIndex = 0;
		statesArr.forEach((Element, index) => {
			if (Element.value === finishState) {
				console.log(index);
				elIndex = index;
			}
		});
		return elIndex;
	};
	console.log("finishState:", finishState, getFinishState());
	return (
		<div className="rule">
			<p className="controlLabel">case:</p>
			<div className="ruleButtons">
				{state.map((direction, index) => {
					return (
						<button
							dataSelector={direction === directions[index] ? "blue" : "white"}
							className="ruleButton"
							onClick={() => {
								let tempState = [...state];
								if (direction === "a") {
									tempState[index] = directions[index];
								} else if (direction === directions[index]) {
									tempState[index] = "x";
								} else if (direction === "x") {
									tempState[index] = "a";
								}
								setState(tempState);
							}}
						>
							{direction === "a" ? "?" : direction === "x" ? "x" : direction}
						</button>
					);
				})}
				<div className="centerSquare"></div>
			</div>
			<p className="controlLabel">action:</p>
			<Select
				value={actionOptions.value}
				options={actionOptions}
				defaultValue={actionOptions[0]}
				onChange={(value, actionType) => {
					if (value.value !== "display") {
						action = value.value;
					}
				}}
			/>
			<Select
				value={statesArr.value}
				options={statesArr}
				defaultValue={statesArr[getFinishState()]}
				onChange={(value, actionType) => {
					if (value.value !== "display") {
						finishState = value.value;
					}
				}}
			/>
			<button
				onClick={() => {
					console.log({
						...rules,
						[state.join("")]: {
							action: action,
							finishState: finishState,
						},
					});
					if (action !== "display") {
						dispatch({
							type: "updateState",
							payload: {
								stateNum: id,
								rules: {
									...rules,
									[state.join("")]: {
										action: action,
										finishState: finishState,
									},
								},
							},
						});
					}
				}}
			>
				Confirm
			</button>
		</div>
	);
}

export default Rule;
