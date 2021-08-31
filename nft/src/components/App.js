import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import PageColors from "./page_colors/PageColors";
import { Web3Api } from "../api/api";

const App = () => {
  let [account, setAccount] = useState(null);
  let [contract, setContract] = useState({});
  let [totalSupply, setTotalSupply] = useState(0);
  let [colors, setColors] = useState([]);
  let [owner, setOwner] = useState("");

  useEffect(() => {
    Web3Api.loadWeb3();
  }, []);

  useEffect(() => {
    Web3Api.loadBlockchainData(
      setAccount,
      setContract,
      setTotalSupply,
      setColors,
      setOwner
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
      <PageColors
        owner={owner}
        newPrice={newPrice}
        putUpForSale={putUpForSale}
        mint={mint}
        colors={colors}
      />
    </div>
  );
};

export default App;
