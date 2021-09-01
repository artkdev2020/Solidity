import React, { useState, useEffect } from "react";
import ForeignCoin from "./ForeignCoin";
import MyCoin from "./MyCoin";

const RouterCoin = (props) => {
  let [coinComponent, setCoinComponent] = useState();

  useEffect(() => {
    const compareAddresses = async () => {
      let ownerAddress = await props.contract.methods
        .ownerOf(props.coin.id)
        .call();
      if (ownerAddress === props.account) {
        setCoinComponent(
          <MyCoin
            coin={props.coin}
            newPrice={props.newPrice}
            putUpForSale={props.putUpForSale}
          />
        );
      } else {
        if (props.coin.isForSale) {
          setCoinComponent(<ForeignCoin coin={props.coin} />);
        } else {
          setCoinComponent(<></>);
        }
      }
    };
    compareAddresses();
  });

  return <>{coinComponent}</>;
};

export default RouterCoin;
