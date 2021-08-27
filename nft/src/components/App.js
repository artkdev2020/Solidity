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

  useEffect(() => {
    Web3Api.loadWeb3();
  }, []);

  useEffect(() => {
    Web3Api.loadBlockchainData(
      setAccount,
      setContract,
      setTotalSupply,
      setColors
    );
  }, []);

  const mint = color => {
    contract.methods
      .mint(color)
      .send({ from: account })
      .once("receipt", receipt => {
        setColors([...colors, color]);
      });
  };

  return (
    <div className="container-fluid">
      <Navbar account={account} />
      <PageColors mint={mint} colors={colors} />
    </div>
  );
};

export default App;
