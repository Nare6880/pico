import { configureStore } from "@reduxjs/toolkit";

import { loadState, saveState, getLastLevelCompleted } from "./localStorage";
const initialState = loadState(getLastLevelCompleted())
	? loadState(getLastLevelCompleted())
	: {
			level: getLastLevelCompleted(),
			state1: {
				stateNum: 1,
				rules: { default: { action: "noDisplay", finishState: "state1" } },
			},
	  }; //{
const reducer = function appReducer(passedState = initialState, action) {
	let state = Object.assign({}, passedState);
	switch (action.type) {
		case "addState":
			const stateFilter = Object.keys(state).filter((element) => {
				if (element === "level") {
					return false;
				} else {
					return true;
				}
			});
			let stateNum =
				Math.max(
					...stateFilter.map((key) => {
						return state[key]["stateNum"];
					})
				) + 1;
			state[`state${stateNum}`] = {
				stateNum: stateNum,
				rules: {
					default: { action: "Display", finishState: `state${stateNum}` },
				},
			};
			break;
		case "removeState":
			delete state[`state${action.payload}`];
			if (Object.keys(state).length === 1) {
				state = {
					level: state.level,
					state1: {
						stateNum: 1,
						rules: { default: { action: "noDisplay", finishState: `state1` } },
					},
				};
			}
			break;
		case "updateState":
			state[`state${action.payload.stateNum}`] = {
				stateNum: action.payload.stateNum,
				rules: action.payload.rules,
			};
			state[`state${action.payload.stateNum}`]["rules"]["default"] = {
				action: "noDisplay",
				finishState: `state${action.payload.stateNum}`,
			};
			if (action.payload.delete) {
				delete state[`state${action.payload.stateNum}`]["rules"][
					action.payload.delete
				];
			}

			break;
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
			state = newState;
			break;
		case "removeRule":
			let rules = { ...state[`state${action.payload.stateNum}`]["rules"] };
			delete rules[action.payload.locationRule];
			state = {
				...state,
				[`state${action.payload.stateNum}`]: {
					...state[`state${action.payload.stateNum}`],
					rules: rules,
				},
			};
			break;
		case "updateLevel":
			saveState(state, state.level);
			state = loadState(action.payload.level)
				? loadState(action.payload.level)
				: {
						level: action.payload.level,
						state1: {
							stateNum: 1,
							rules: {
								default: { action: "noDisplay", finishState: "state1" },
							},
						},
				  };
			break;
		default:
			break;
	}
	saveState(state, state.level);
	console.log(state);
	return state;
};
export default configureStore({
	reducer: { reducer },
	initialState,
});
