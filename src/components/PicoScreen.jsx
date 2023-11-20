import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../App.css";
import levels from "../assets/yeet.json";
export default function PicoScreen({ isRunning, setIsRunning }) {
	const [currentLevel, setCurrentLevel] = useState(1);
	const rules = useSelector((state) => state.reducer);
	const [gameState, setGameState] = useState({
		Pos: levels.level1.validSpawns[
			Math.floor(Math.random() * levels.level1.validSpawns.length)
		],
		map: levels.level1.map,
		state: Object.keys(rules)[0],
		cellsToGo: levels.level1.validSpawns.length - 1,
	});
	const getValidSpawns = (map) => {
		var validSpawns = [];
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (map[i][j] === 0) {
					validSpawns.push([i, j]);
				}
			}
		}
		return validSpawns;
	};
	console.log("valid spawns", getValidSpawns(gameState.map));
	console.log("pico", gameState);
	var tempMap = [...gameState.map];
	tempMap[gameState.Pos[0]][gameState.Pos[1]] = -1;
	var tempPos = [...gameState.Pos];
	const getLocationCase = () => {
		var positionString = "";
		if (tempPos[0] === 0 || tempMap[tempPos[0] - 1][tempPos[1]] === 1) {
			positionString += "N";
		} else {
			positionString += "a";
		}
		if (tempPos[0] === 24 || tempMap[tempPos[0] + 1][tempPos[1]] === 1) {
			positionString += "S";
		} else {
			positionString += "a";
		}
		if (tempPos[1] === 24 || tempMap[tempPos[0]][tempPos[1] + 1] === 1) {
			positionString += "E";
		} else {
			positionString += "a";
		}
		if (tempPos[1] === 0 || tempMap[tempPos[0]][tempPos[1] - 1] === 1) {
			positionString += "W";
		} else {
			positionString += "a";
		}
		return positionString;
	};

	const updateGrid = (direction, tempRuleState) => {
		if (direction === "N" && tempPos[0] > 0) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			tempPos[0] = tempPos[0] - 1;
		} else if (direction === "S" && tempPos[0] < 24) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			tempPos[0] = tempPos[0] + 1;
		} else if (direction === "E" && tempPos[1] < 24) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			tempPos[1] = tempPos[1] + 1;
		} else if (direction === "W" && tempPos[1] > 0) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			tempPos[1] = tempPos[1] - 1;
		}

		console.log("hmm", direction, tempRuleState);
		tempMap[tempPos[0]][tempPos[1]] = -1;
		return { Pos: tempPos, map: tempMap, state: tempRuleState };
	};
	useEffect(() => {
		let interval = null;
		if (isRunning) {
			interval = setInterval(() => {
				if (
					typeof rules[gameState.state]["rules"][getLocationCase()] ===
					"undefined"
				) {
					console.log("yeet");

					return;
				}
				console.log();
				console.log(rules[gameState.state]["rules"][getLocationCase()]);
				let obj = updateGrid(
					rules[gameState.state]["rules"][getLocationCase()]["action"],
					rules[gameState.state]["rules"][getLocationCase()]["finishState"]
				);
				console.log(obj);
				setGameState(obj);
			}, 50);
		}
		return () => clearInterval(interval);
	}, [isRunning, rules, gameState]);
	function getColor(position) {
		const i = tempMap[position[0]][position[1]];
		if (i === -1) return "#EB5E28";
		else if (i === 0) return "#FFFCF2";
		else if (i === 1) return "blue";
		else if (i === 2) return "gray";
	}
	//Toggles wall Status
	const ChangeColor = (event) => {
		let cordinates = event.target.id.split(",");
		if (event.target.style.backgroundColor != "blue") {
			event.target.style.backgroundColor = "blue";
			tempMap[cordinates[0]][cordinates[1]] = 1;
			setGameState({ ...gameState, map: tempMap });
		} else event.target.style.backgroundColor = "#FFFCF2";
		console.log("yeet");
	};
	return (
		<div>
			<div className="grid">
				{tempMap.map((list, i) => {
					return list.map((item, j) => {
						return (
							<button
								className="buttonSquare"
								onClick={ChangeColor}
								id={i + "," + j}
								style={{ backgroundColor: getColor([i, j]) }}
							></button>
						);
					});
				})}
			</div>
			<div className="screenControls">
				<p>controls:</p>

				<div className="screenControlRow">
					<p className="controlLabel">case:</p>
					<div className="ruleButtons">
						{getLocationCase()
							.split("")
							.map((direction, index) => {
								return (
									<button
										dataSelector={
											direction === getLocationCase[index] ? "blue" : "white"
										}
										className="ruleButton"
									>
										{direction === "a"
											? "?"
											: direction === "x"
											? "x"
											: direction}
									</button>
								);
							})}
						<div className="centerSquare"></div>
					</div>
					<p className="controlLabel">Move pico:</p>
					<div className="ruleButtons">
						{getLocationCase()
							.split("")
							.map((direction, index) => {
								return (
									<button
										dataSelector={
											direction === getLocationCase[index] ? "blue" : "white"
										}
										className="ruleButton"
									>
										{direction === "a"
											? "?"
											: direction === "x"
											? "x"
											: direction}
									</button>
								);
							})}
					</div>
					<button>Reset</button>
					<button>previousMap</button>
					<p className="controlLabel">change map: {currentLevel}</p>
					<button>nextMap</button>
					<p className="controlLabel">cells to go: {gameState.cellsToGo}</p>
				</div>
			</div>
		</div>
	);
}
