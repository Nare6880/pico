import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import levels from "../assets/yeet.json";
import { getLastLevelCompleted, saveCompleted } from "../logic/localStorage.js";
export default function PicoScreen({
	isRunning,
	setIsRunning,
	runGame,
	openModal,
}) {
	const [currentLevel, setCurrentLevel] = useState(getLastLevelCompleted());
	const rules = useSelector((state) => state.reducer);
	const [gameState, setGameState] = useState({
		Pos: levels[`level${currentLevel}`].validSpawns[
			Math.floor(
				Math.random() * levels[`level${currentLevel}`].validSpawns.length
			)
		],
		map: levels[`level${currentLevel}`].map,
		state: Object.keys(rules)[1],
		cellsToGo: levels[`level${currentLevel}`].validSpawns.length - 1,
	});
	const dispatch = useDispatch();
	const resetGame = (currentLevel) => {
		let tempMap = levels[`level${currentLevel}`].map.map((array) => {
			return array.map((element) => {
				return element !== 0 && element !== 1 ? 0 : element;
			});
		});
		setGameState({
			Pos: levels[`level${currentLevel}`].validSpawns[
				Math.floor(
					Math.random() * levels[`level${currentLevel}`].validSpawns.length
				)
			],
			map: tempMap,
			state: Object.keys(rules)[1],
			cellsToGo: levels[`level${currentLevel}`].validSpawns.length - 1,
		});
		setIsRunning(false);
	};
	var tempMap = [...gameState.map];
	tempMap[gameState.Pos[0]][gameState.Pos[1]] = -1;
	var tempPos = [...gameState.Pos];
	const getLocationCase = () => {
		var positionString = "";
		if (tempPos[0] === 0 || tempMap[tempPos[0] - 1][tempPos[1]] === 1) {
			positionString += "N";
		} else {
			positionString += "x";
		}
		if (tempPos[0] === 24 || tempMap[tempPos[0] + 1][tempPos[1]] === 1) {
			positionString += "S";
		} else {
			positionString += "x";
		}
		if (tempPos[1] === 24 || tempMap[tempPos[0]][tempPos[1] + 1] === 1) {
			positionString += "E";
		} else {
			positionString += "x";
		}
		if (tempPos[1] === 0 || tempMap[tempPos[0]][tempPos[1] - 1] === 1) {
			positionString += "W";
		} else {
			positionString += "x";
		}
		return positionString;
	};
	const updateGrid = (direction, tempRuleState) => {
		let squareModified = false;
		if (
			direction === "N" &&
			tempPos[0] > 0 &&
			tempMap[tempPos[0] - 1][tempPos[1]] !== 1
		) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			squareModified = tempMap[tempPos[0] - 1][tempPos[1]] !== 2;
			tempPos[0] = tempPos[0] - 1;
		} else if (
			direction === "S" &&
			tempPos[0] < 24 &&
			tempMap[tempPos[0] + 1][tempPos[1]] !== 1
		) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			squareModified = tempMap[tempPos[0] + 1][tempPos[1]] !== 2;
			tempPos[0] = tempPos[0] + 1;
		} else if (
			direction === "E" &&
			tempPos[1] < 24 &&
			tempMap[tempPos[0]][tempPos[1] + 1] !== 1
		) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			squareModified = tempMap[tempPos[0]][tempPos[1] + 1] !== 2;
			tempPos[1] = tempPos[1] + 1;
		} else if (
			direction === "W" &&
			tempPos[1] > 0 &&
			tempMap[tempPos[0]][tempPos[1] - 1] !== 1
		) {
			tempMap[tempPos[0]][tempPos[1]] = 2;
			squareModified = tempMap[tempPos[0]][tempPos[1] - 1] !== 2;
			tempPos[1] = tempPos[1] - 1;
		}
		tempMap[tempPos[0]][tempPos[1]] = -1;
		return {
			Pos: tempPos,
			map: tempMap,
			state: tempRuleState,
			cellsToGo: gameState.cellsToGo - squareModified,
		};
	};
	const getMatchingRule = (locationCase) => {
		let rulesArr = Object.keys(rules[gameState.state]["rules"]);
		rulesArr.shift();

		for (let i = 0; i < rulesArr.length; i++) {
			for (let j = 0; j < 4; j++) {
				if (rulesArr[i][j] !== locationCase[j] && rulesArr[i][j] !== "a") {
					break;
				} else if (j === 3) {
					return rulesArr[i];
				}
			}
		}
	};
	const step = () => {
		if (
			typeof rules[gameState.state]["rules"][
				getMatchingRule(getLocationCase())
			] === "undefined"
		) {
			return;
		} else {
			let obj = updateGrid(
				rules[gameState.state]["rules"][getMatchingRule(getLocationCase())][
					"action"
				],
				rules[gameState.state]["rules"][getMatchingRule(getLocationCase())][
					"finishState"
				]
			);
			if (obj.cellsToGo <= 0) {
				setGameState(obj, () => {
					openModal();
					saveCompleted(currentLevel);
				});
			} else {
				setGameState(obj);
			}
		}
	};

	useEffect(() => {
		if (gameState.cellsToGo <= 0 && isRunning) {
			openModal();
			saveCompleted(currentLevel);
			setIsRunning(false);
		}
	}, [gameState, openModal, currentLevel]);
	useEffect(() => {
		let interval = null;
		if (isRunning && gameState.cellsToGo > 0) {
			interval = setInterval(() => {
				if (
					typeof rules[gameState.state]["rules"][
						getMatchingRule(getLocationCase())
					] === "undefined" ||
					gameState.cellsToGo <= 0
				) {
					console.log("yeet");
					return;
				}
				let obj = updateGrid(
					rules[gameState.state]["rules"][getMatchingRule(getLocationCase())][
						"action"
					],
					rules[gameState.state]["rules"][getMatchingRule(getLocationCase())][
						"finishState"
					]
				);
				if (obj.cellsToGo <= 0) {
					saveCompleted(currentLevel);
					setGameState(obj);
				} else {
					setGameState(obj);
				}
			}, 20);
		}
		return () => clearInterval(interval);
	}, [isRunning, rules, gameState, saveCompleted, openModal, currentLevel]);
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
		if (event.target.style.backgroundColor !== "blue") {
			event.target.style.backgroundColor = "blue";
			tempMap[cordinates[0]][cordinates[1]] = 1;
			console.log(tempMap);
			// setGameState({ ...gameState, map: tempMap });
		} else event.target.style.backgroundColor = "#FFFCF2";
	};
	return (
		<div>
			<div className="grid">
				{gameState.map.map((list, i) => {
					return list.map((item, j) => {
						return (
							<button
								className="buttonSquare"
								onClick={ChangeColor}
								id={i + "," + j + item}
								key={i + "," + j + item}
								style={{ backgroundColor: getColor([i, j]) }}
							></button>
						);
					});
				})}
			</div>
			<div className="screenControls">
				<p className="controlHeader">controls:</p>
				<div>
					<p className="">case:</p>
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
				</div>
				<div className="gridItem">
					<p className="">Move pico:</p>
					<div className="ruleButtons">
						<button
							className="ruleButton"
							onClick={() => setGameState(updateGrid("N", gameState.state))}
						>
							N
						</button>
						<button
							className="ruleButton"
							onClick={() => setGameState(updateGrid("S", gameState.state))}
						>
							S
						</button>
						<button
							className="ruleButton"
							onClick={() => setGameState(updateGrid("E", gameState.state))}
						>
							E
						</button>
						<button
							className="ruleButton"
							onClick={() => setGameState(updateGrid("W", gameState.state))}
						>
							W
						</button>
					</div>
				</div>
				<div>
					<button className="AddControlRow" onClick={runGame}>
						Run
					</button>
					<button onClick={step}>step</button>
					<div>
						<p className="">cells to go: {gameState.cellsToGo}</p>
						<p>{gameState.state}</p>
					</div>
					<button onClick={() => resetGame(currentLevel)}>Reset</button>
				</div>
				<div>
					<button
						onClick={() => {
							setCurrentLevel(
								currentLevel - 1 < 0
									? Object.keys(levels).length - 1
									: currentLevel - 1
							);
							resetGame(
								currentLevel - 1 < 0
									? Object.keys(levels).length - 1
									: currentLevel - 1
							);
							dispatch({
								type: "updateLevel",
								payload: {
									level:
										currentLevel - 1 < 0
											? Object.keys(levels).length - 1
											: currentLevel - 1,
								},
							});
						}}
					>
						previousMap
					</button>
					<p className="">Current level: {currentLevel + 1}</p>
					<button
						onClick={() => {
							setCurrentLevel((currentLevel + 1) % Object.keys(levels).length);
							resetGame((currentLevel + 1) % Object.keys(levels).length);
							dispatch({
								type: "updateLevel",
								payload: {
									level: (currentLevel + 1) % Object.keys(levels).length,
								},
							});
						}}
					>
						nextMap
					</button>
				</div>
			</div>
		</div>
	);
}
