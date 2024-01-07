import { React, useState } from "react";
import Select from "react-select";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
function Rule({ id, locationRule }) {
	var stateString = locationRule === "default" ? "aaaa" : locationRule;
	const [state, setState] = useState(stateString.split(""));
	const directions = ["N", "S", "E", "W"];

	const [action, setAction] = useState(
		useSelector(
			(state) => state.reducer[`state${id}`]["rules"][locationRule]["action"]
		)
	);
	const [finishState, setFinishState] = useState(
		useSelector(
			(state) =>
				state.reducer[`state${id}`]["rules"][locationRule]["finishState"]
		)
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
			return {
				value: `${Element}`,
				label: `${Element.slice(0, 5) + " " + Element.slice(5)}`,
			};
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
	const getaction = () => {
		var elIndex = 0;
		actionOptions.forEach((Element, index) => {
			if (Element.value === action) {
				console.log(index);
				elIndex = index;
			}
		});
		return elIndex;
	};
	console.log("finishState:", finishState, getFinishState());
	return (
		<div className="rule">
			<div className="controlElement">
				<p className="controlLabel">case:</p>
				<div className="ruleButtons">
					{state.map((direction, index) => {
						return (
							<button
								dataSelector={
									direction === directions[index] ? "blue" : "white"
								}
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
			</div>
			<div className="controlElement">
				<p className="controlLabel">action:</p>
				<div className="controlSelect">
					<Select
						value={actionOptions.value}
						options={actionOptions}
						defaultValue={actionOptions[getaction()]}
						onChange={(value, actionType) => {
							if (value.value !== "display") {
								setAction(value.value);
							}
						}}
					/>
				</div>
			</div>

			<div className="controlElement">
				<p className="controlLabel">finish state:</p>
				<Select
					value={statesArr.value}
					options={statesArr}
					defaultValue={statesArr[getFinishState()]}
					onChange={(value, actionType) => {
						if (value.value !== "display") {
							setFinishState(value.value);
						}
					}}
				/>
			</div>
			<div className="controlElement">
				<button
					className="controlButton"
					onClick={() => {
						console.log("updateState", state.join(""), action, finishState);
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
				{locationRule !== "default" ? (
					<button
						className="controlButton"
						onClick={() => {
							dispatch({
								type: "removeRule",
								payload: { stateNum: id, locationRule: locationRule },
							});
						}}
					>
						remove rule
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default Rule;
