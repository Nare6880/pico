import React,  { Component, useState }  from "react";
import "../App.css"
export default function
PicoControl(){
    return (
        <div className='ControlContainer'>
            <div className='ControlRow'></div>
            <div className='ControlRow'></div>
            <div className='ControlRow'></div>
            <div className='ControlRow NoBackground'>
                <button className='AddControlRow'>Add Row</button>
            </div>
        </div>)
}