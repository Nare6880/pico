export const loadState = (levelNum) => {
	try {
		const serializedState = localStorage.getItem(`PicoRulesLevel${levelNum}`);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.log("No state found");
		return undefined;
	}
};
export const saveState = (state, levelNum) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(`PicoRulesLevel${levelNum}`, serializedState);
	} catch {
		console.log("Error saving state");
	}
};
