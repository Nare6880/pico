import React, { useState, useEffect } from "react";

const Chat = () => {
    const [snake, setSnake] = useState([[0, 0]]);
    const [food, setFood] = useState([10, 10]);
    const [direction, setDirection] = useState("right");
    const [speed, setSpeed] = useState(200);
    const [isRunning, setIsRunning] = useState(true);
    useEffect(() => {
        let interval;
        if(isRunning) {
            interval = setInterval(() => {
                move();
            }, speed);
        }
        return () => clearInterval(interval);
    }, [snake, food, direction, speed]);

    const move = () => {
        let x = snake[0][0];
        let y = snake[0][1];

        switch (direction) {
            case "right":
                x++;

                break;
            case "left":
                x--;

                break;
            case "up":
                y--;

                break;
            case "down":
                y++;

                break;
            default:
                break;
        }

        if (x === food[0] && y === food[1]) {
            setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
            setSnake([...snake, [x, y]]);
            console.log('eat')

        } else {
            setSnake([...snake.slice(1), [x, y]]);
            console.log(x,y,food[0],food[1])
        }
    };

    const handleKeyPress = (event) => {
        switch (event.keyCode) {
            case 37:
                setDirection("left");
                break;
            case 38:
                setDirection("up");
                break;
            case 39:
                setDirection("right");
                break;
            case 40:
                setDirection("down");
                break;
        }
    };
    const handlePauseButton = () => {
        setIsRunning(!isRunning);
    };
    return (
        <div>
        <div tabIndex="0" onKeyDown={handleKeyPress} style={{position:'relative', height:500, width:'500'}}>
            <div className="game-container">
                {snake.map((coord, index) => (
                    <div
                        key={index}
                        className="snake-unit"
                        style={{ position:"absolute", left: `${coord[0] * 20}px`, top: `${coord[1] * 20}px `, width:20, height:20, backgroundColor:"white" }}
                    />
                ))}
                <div
                    className="food-unit"
                    style={{ position:"absolute", left: `${food[0] * 20}px`, top: `${food[1] * 20}px`, width:20, height:20, backgroundColor:"green" }}
                />
            </div>
        </div>
        <div>
            <button onClick={handlePauseButton}>
                {isRunning ? "Pause" : "Start"}
            </button>
        </div>
    </div>


    );
};

export default Chat;
