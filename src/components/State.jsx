import React, { useState } from "react";
import Rule from "./rule";
function State({ id, removeState, states }) {
  const [rules, setRules] = useState({ "default": "noDisplay" });
  const addCase = () => {
    let tempRule = { ...rules };
    tempRule["default"] = "display";
    setRules(tempRule);
  };
  const updateRule = (state, action) => {
    let tempRule = { ...rules };
    tempRule[state] = action;
    tempRule.default = "noDisplay";
    console.log(tempRule);
    setRules(tempRule);
  };
  console.log(Object.keys(rules));
  return (
    <div className="state">
      <div className="state-header">
        <h2>State {id}</h2>
        <div className="state-control">
          <button onClick={addCase}>Add case</button>
          <button onClick={() => removeState(id - 1)}>Remove State</button>
        </div>
        {Object.keys(rules).reverse().map((key, index) => {
          console.log(key, index);
          return rules[key] !== "noDisplay"
            ? (
              <Rule
                states = {states}
                locationRule={key}
                data={rules[key]}
                updateRule={updateRule}
                stateNum = {id}
              />
            )
            : (
              ""
            );
        })}
      </div>
    </div>
  );
}
export default State;
