import React from "react";
import RouterCoin from "./RouterCoins";

const NonOwnerPage = (props) => {
  return (
    <div className="container mt-5">
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

export default NonOwnerPage;
