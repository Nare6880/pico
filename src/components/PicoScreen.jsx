import React,  { Component, useState }  from "react";
import "../App.css"

export default function
    PicoScreen(){
    const[Pos, setPos] = useState([Math.floor((Math.random()*25)), Math.floor((Math.random()*25))])
    const[Map, setMap] = useState([])
        let list = []
        let tempMap = []
        for (let i = 0; i < 25; i++) {
            let tempList = []
            for (let j = 0; j < 25; j++) {
                list.push([i,j])
                if (i == Pos[0] && j == Pos[1]){
                    tempList.push(-1)
                }
                else {
                    tempList.push(0)
                }
            }
            tempMap.push(tempList)
        }

        console.log(Pos)
        function
        getColor(position){
            const i = tempMap[position[0]][position[1]]
            if (i == -1)
                return '#EB5E28'
            else if (i == 0)
                return '#FFFCF2'
            else if (i == 1)
                return 'blue'


        }
        //Toggles wall Status
        const ChangeColor =(event)=> {
            if (event.target.style.backgroundColor != "blue")
                event.target.style.backgroundColor = "blue";
            else
                event.target.style.backgroundColor = "#FFFCF2";
            console.log('yeet')}
        return(
            <div className='grid'>
                {list.map((i)=>{
                    return <button className='buttonSquare' key ={i} onClick={ChangeColor} style = {{backgroundColor:getColor(i)}}id = {i}></button>})}
            </div>
            );

    }
