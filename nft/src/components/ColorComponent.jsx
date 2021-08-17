import React from "react";

const ColorComponent = props => {
  return (
    <div key={props.color} className="col mb-3">
      <div className="token" style={{ backgroundColor: props.color }}></div>
      <div>{props.color}</div>
    </div>
  );
};

export default ColorComponent;
