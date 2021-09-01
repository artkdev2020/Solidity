import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import PageColors from "./page_colors/PageColors";
import { Web3Api } from "../api/api";
import PageCoins from "./coins/PageCoins";

const App = () => {
  let [account, setAccount] = useState(null);
  let [contract, setContract] = useState({});
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

  const mint = (color) => {
    contract.methods.mint(color).send({ from: account });
    // .once("receipt", (receipt) => {
    //   setColors([...colors, color]);
    // });
  };

  const putUpForSale = (id, sold) => {
    contract.methods.sale(id, sold).send({ from: account });
  };

  const newPrice = (id, newPrice) => {
    contract.methods.changePrice(id, newPrice).send({ from: account });
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
          coins={colors}
        />
      </div>
    </div>
  );
};

export default App;

{
  /* <PageColors
        account={account}
        ownerContract={ownerContract}
        newPrice={newPrice}
        putUpForSale={putUpForSale}
        mint={mint}
        colors={colors}
      /> */
}
