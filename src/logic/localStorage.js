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
export const saveCompleted = (levelNum) => {
	console.log("saving");
	try {
		const serializedState = localStorage.getItem("PicoLevelsCompleted");
		if (serializedState !== null) {
			let state = serializedState;
			state[`${levelNum}`] = true;
			localStorage.setItem("PicoLevelsCompleted", JSON.stringify(state));
		} else {
			let defualtState = {
				0: false,
				1: false,
				2: false,
				3: false,
				4: false,
				5: false,
			};
			defualtState[`${levelNum}`] = true;
			console.log(defualtState);
			localStorage.setItem("PicoLevelsCompleted", JSON.stringify(defualtState));
		}
	} catch {
		console.log("Error saving state");
	}
};
export const getLastLevelCompleted = () => {
	try {
		const serializedState = JSON.parse(
			localStorage.getItem("PicoLevelsCompleted")
		);
		if (serializedState === null) {
			return 0;
		}
		let levelNum = 0;
		while (serializedState[`${levelNum}`] === true) {
			levelNum++;
		}
		return Math.min(levelNum, 5);
	} catch (err) {
		console.log("No state found");
		return 0;
	}
};
