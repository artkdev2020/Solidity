import React, { useState, useEffect } from "react";
import OwnerPage from "./OwnerPage";
import NonOwnerPage from "./NonOwnerPage";

const PageCoins = (props) => {
  let [page, setPage] = useState();

  useEffect(() => {
    if (props.account === props.ownerContract) {
      setPage(
        <OwnerPage
          account={props.account}
          contract={props.contract}
          ownerContract={props.ownerContract}
          newPrice={props.newPrice}
          putUpForSale={props.putUpForSale}
          mint={props.mint}
          transfer={props.transfer}
          coins={props.coins}
        />
      );
    } else {
      setPage(
        <NonOwnerPage
          account={props.account}
          contract={props.contract}
          ownerContract={props.ownerContract}
          newPrice={props.newPrice}
          putUpForSale={props.putUpForSale}
          mint={props.mint}
          transfer={props.transfer}
          coins={props.coins}
        />
      );
    }
  }, [props.account, props.ownerContract]);

  return <div className="container mt-5">{page}</div>;
};

export default PageCoins;
