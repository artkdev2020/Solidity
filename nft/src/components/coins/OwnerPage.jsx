import React from "react";
import AddColor from "./../addColor/AddColor";
import RouterCoin from "./RouterCoins";

const OwnerPage = (props) => {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <AddColor mint={props.mint} />
      </div>
      <hr />
      <div className="row justify-content-between">
        {props.coins.map((coin, k) => {
          return (
            <RouterCoin
              account={props.account}
              contract={props.contract}
              newPrice={props.newPrice}
              putUpForSale={props.putUpForSale}
              transfer={props.transfer}
              coin={coin}
              key={k}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OwnerPage;
