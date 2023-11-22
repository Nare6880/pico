import { configureStore } from "@reduxjs/toolkit";
import yeet from "./assets/yeet1.json";
const initialState = yeet.yeet2;

// const initialState = {
// 	state1: {
// 		stateNum: 1,
// 		rules: { default: { action: "noDisplay", finishState: "state1" } },
// 	},
// };
const reducer = function appReducer(passedState = initialState, action) {
	let state = { ...passedState };
	switch (action.type) {
		case "addState":
			console.log(state);
			let stateNum =
				Math.max(
					...Object.keys(state).map((key) => {
						return state[key]["stateNum"];
					})
				) + 1;
			state[`state${stateNum}`] = {
				stateNum: stateNum,
				rules: {
					default: { action: "noDisplay", finishState: `state${stateNum}` },
				},
			};
			return state;
		case "removeState":
			delete state[`state${action.payload}`];
			if (Object.keys(state).length === 0) {
				state = {
					state1: {
						stateNum: 1,
						rules: { default: { action: "noDisplay", finishState: `state1` } },
					},
				};
			}
			return state;
		case "updateState":
			state[`state${action.payload.stateNum}`] = {
				stateNum: action.payload.stateNum,
				rules: action.payload.rules,
			};
			state[`state${action.payload.stateNum}`]["rules"]["default"] = {
				action: "noDisplay",
				finishState: `state${action.payload.stateNum}`,
			};

			return state;
		case "addRule":
			let newState = {
				...state,
				[`state${action.payload.stateNum}`]: {
					...state[`state${action.payload.stateNum}`],
					rules: {
						...state[`state${action.payload.stateNum}`]?.rules,
						default: {
							action: "display",
							finishState: `state${action.payload.stateNum}`,
						},
					},
				},
			};
			return newState;
		default:
			return state;
	}
};
export default configureStore({
	reducer: { reducer },
	initialState,
});
