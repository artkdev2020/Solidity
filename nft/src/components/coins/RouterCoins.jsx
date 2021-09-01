import React, { useState, useEffect } from "react";
import ForeignCoin from "./ForeignCoin";
import MyCoin from "./MyCoin";

const RouterCoin = (props) => {
  let [coinComponent, setCoinComponent] = useState();
  let [ownerAddress, setOwnerAddress] = useState();
  useEffect(() => {
    const compareAddresses = async () => {
      let ownerAddress = await props.contract.methods
        .ownerOf(props.coin.id)
        .call();

      setOwnerAddress(ownerAddress);

      if (ownerAddress === props.account) {
        setCoinComponent(
          <MyCoin
            coin={props.coin}
            newPrice={props.newPrice}
            putUpForSale={props.putUpForSale}
            transfer={props.transfer}
          />
        );
      } else {
        if (props.coin.isForSale) {
          setCoinComponent(
            <ForeignCoin
              coin={props.coin}
              transfer={props.transfer}
              ownerAddress={ownerAddress}
            />
          );
        } else {
          setCoinComponent(<></>);
        }
      }
    };
    compareAddresses();
  }, [props.account, ownerAddress]);

  return <>{coinComponent}</>;
};

export default RouterCoin;
