import React from "react";
import AddColor from "./../addColor/AddColor";
import ColorComponent from "./../ColorComponent";

const PageColors = props => {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <AddColor mint={props.mint} />
      </div>
      <hr />
      <div className="row text-center">
        {props.colors.map((color, key) => {
          return <ColorComponent color={color} key={key} />;
        })}
      </div>
    </div>
  );
};

export default PageColors;
