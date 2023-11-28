import PicoScreen from "./components/PicoScreen";
import PicoControl from "./components/PicoControl";
import React from "react";
import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./logic/store";
function App() {
	const [isRunning, setIsRunning] = useState(false);
	const runGame = () => {
		console.log("running");
		setIsRunning(true);
	};
	return (
		<div className="App">
			<Provider store={store}>
				<PicoScreen
					isRunning={isRunning}
					setIsRunning={setIsRunning}
					runGame={runGame}
				></PicoScreen>
				<PicoControl runGame={runGame}></PicoControl>
			</Provider>
		</div>
	);
}

export default App;
//<PicoScreen></PicoScreen>
//<PicoControl></PicoControl>
