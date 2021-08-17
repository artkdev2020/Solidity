import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Color from "../abis/Color.json";
import Navbar from "./Navbar";
import PageColors from "./page_colors/PageColors";

const App = () => {
  let [account, setAccount] = useState(null);
  let [contract, setContract] = useState({});
  let [totalSupply, setTotalSupply] = useState(0);
  let [colors, setColors] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currrentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    const loadBlokchainData = async () => {
      const web3 = window.web3;

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = Color.networks[networkId];

      if (networkData) {
        const abi = Color.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);

        setContract(contract);

        const totalSupply = await contract.methods.totalSupply().call();
        setTotalSupply(totalSupply);

        let result = [];
        for (let i = 1; i <= totalSupply; i++) {
          const color = await contract.methods.colors(i - 1).call();
          result.push(color);
        }
        setColors(result);
      } else {
        window.alert("Smart contract not deployed to detected network.");
      }
    };

    loadBlokchainData();
  }, []);

  const mint = color => {
    this.state.contract.methods
      .mint(color)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({
          colors: [...this.state.colors, color]
        });
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
