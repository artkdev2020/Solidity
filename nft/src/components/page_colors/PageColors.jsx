/* eslint-disable no-unused-vars */
import React from "react";
import AddColor from "./../addColor/AddColor";
import ColorComponent from "./../ColorComponent";
import PageCoins from "./../coins/PageCoins";

const PageColors = (props) => {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <AddColor mint={props.mint} />
      </div>
      <hr />
      <div className="row justify-content-between">
        {props.colors.map((color, k) => {
          return (
            <ColorComponent
              owner={props.owner}
              newPrice={props.newPrice}
              putUpForSale={props.putUpForSale}
              transfer={props.transfer}
              color={color}
              key={k}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PageColors;
