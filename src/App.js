import PicoScreen from "./components/PicoScreen";
import PicoControl from "./components/PicoControl";
import React from "react";
import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./logic/store";
function App() {
	const [isRunning, setIsRunning] = useState(false);
	const [levelCompleted, setLevelCompleted] = useState(false);
	const [isOpen, setIsOpen] = useState(true);
	const runGame = () => {
		console.log("running");
		setIsRunning(true);
	};
	const openModal = () => {
		setIsOpen(true);
		setLevelCompleted(true);
	};
	return (
		<div className="App">
			<Provider store={store}>
				<PicoScreen
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					runGame={runGame}
					openModal={openModal}
				></PicoScreen>
				<PicoControl runGame={runGame}></PicoControl>
			</Provider>
			<dialog open={levelCompleted && isOpen}>
				competed level!
				<button onClick={() => setIsOpen(false)}>close</button>
			</dialog>
		</div>
	);
}

export default App;
//<PicoScreen></PicoScreen>
//<PicoControl></PicoControl>
