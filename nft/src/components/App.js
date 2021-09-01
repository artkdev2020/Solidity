import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { Web3Api } from "../api/api";
import PageCoins from "./coins/PageCoins";

const App = () => {
  let [account, setAccount] = useState(null);
  let [contract, setContract] = useState({});
  // let [update, setUpdate] = useState({});
  // eslint-disable-next-line no-unused-vars
  let [totalSupply, setTotalSupply] = useState(0);
  let [colors, setColors] = useState([]);
  let [ownerContract, setOwnerContract] = useState("");

  useEffect(() => {
    Web3Api.loadWeb3();
  }, []);

  useEffect(() => {
    Web3Api.loadBlockchainData(
      setAccount,
      setContract,
      setTotalSupply,
      setColors,
      setOwnerContract
    );
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (account) {
      window.location.reload();
    });
  }, []);

  const mint = (color) => {
    contract.methods
      .mint(color)
      .send({ from: account })
      .on("confirmation", () => {
        window.location.reload();
      });
  };

  const putUpForSale = (id, sold) => {
    contract.methods
      .sale(id, sold)
      .send({ from: account })
      .on("confirmation", () => {
        window.location.reload();
      });
  };

  const newPrice = (id, newPrice, amount) => {
    contract.methods
      .changePrice(id, newPrice)
      .send({ from: account, value: amount })
      .on("confirmation", () => {
        window.location.reload();
      });
  };

  const transfer = (ownerAddress, tokenId, amount) => {
    contract.methods
      .transfer(ownerAddress, parseInt(tokenId))
      .send({ from: account, value: amount })
      .on("confirmation", () => {
        window.location.reload();
      });
  };

  return (
    <div className="container-fluid">
      <Navbar account={account} />
      <div className="row">
        <PageCoins
          account={account}
          contract={contract}
          ownerContract={ownerContract}
          newPrice={newPrice}
          putUpForSale={putUpForSale}
          mint={mint}
          transfer={transfer}
          coins={colors}
        />
      </div>
    </div>
  );
};

export default App;
