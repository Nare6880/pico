import { React, useState } from "react";
import Select from "react-select";
import "../App.css";

function Rule({ updateRule, locationRule, data, states, stateNum }) {
  const [state, setState] = useState(locationRule);
  const [action, setAction] = useState(data);
  console.log("key: ", locationRule, "data:", data);
  const stateOptions = [
    { value: "default", label: "Select" },
    { value: "Naaa", label: "N***" },
    { value: "aSaa", label: "*S**" },
    { value: "aaEa", label: "**E*" },
    { value: "aaaW", label: "***W" },
  ];
  var statesArr = Array.from(states.filter((Element) => {
    if (Element === stateNum){
      return false
    }
    return true
  }).map((Element) => {
    return { value: `State${Element}`, label: `${Element}` };
  }));
  var actionOptions = [
    { value: "display", label: "Select" },
    { value: "N", label: "N" },
    { value: "S", label: "S" },
    { value: "E", label: "E" },
    { value: "W", label: "W" },
  ];
  console.log(statesArr)
  
  actionOptions = actionOptions.concat(statesArr)
    console.log(actionOptions);
  return (
    <div className="rule">
      <p>case:</p>
      <Select
        value={stateOptions.value}
        options={stateOptions}
        onChange={(value, actionType) => {
          console.log(value.value);
          if (value !== "default" && action !== "display") {
            updateRule(value.value, action);
          }
          setState(value.value);
        }}
        defaultValue={stateOptions[
          stateOptions.findIndex((obj) => obj.value === state)
        ]}
      />
      <p>action:</p>
      <Select
        value={actionOptions.value}
        options={actionOptions}
        defaultValue={actionOptions[
          actionOptions.findIndex((obj) => obj.value === data)
        ]}
        onChange={(value, actionType) => {
          if (value !== "display" && state !== "default") {
            updateRule(state, value.value);
          }
          setAction(value.value);
        }}
      />
    </div>
  );
}

export default Rule;