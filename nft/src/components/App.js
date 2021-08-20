import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Color from "../abis/Color.json";
import Navigation from "./Navigation";
import Form from "./Form";
import Token from "./Token";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("no connected account");
  const [contract, setContract] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          window.alert("User denied account access...");
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const { web3 } = window;
      const _accounts = await web3.eth.getAccounts();
      setAccount(_accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = Color.networks[networkId];
      if (networkData) {
        const _contract = new web3.eth.Contract(Color.abi, networkData.address);
        const _totalSupply = await _contract.methods.totalSupply().call();
        let _colors = [];
        for (var i = 0; i < _totalSupply; i++) {
          const _color = await _contract.methods.colors(i).call();
          _colors.push(_color);
        }

        setContract(_contract);
        setTotalSupply(_totalSupply);
        setColors(_colors);
      } else {
        window.alert(
          "Social Network contract not deployed to detected network"
        );
      }
    };

    loadBlockchainData();
  }, []);

  const checkIfColorExists = (color) => {
    let exists = false;

    colors.forEach((c) => {
      if (c === color) {
        exists = true;
      }
    });

    return exists;
  };

  const mint = (color) => {
    if (checkIfColorExists(color)) {
      let _colors = colors;
      _colors.push(color);

      contract.methods
        .mint(color)
        .send({ from: account })
        .on("receipt", (receipt) => {
          console.log("receipt: ", receipt);
        })
        .on("confirmation", (confirmation) => {
          console.log("confirmation: ", confirmation);
          this.setColors(_colors);
        });
    } else {
      alert("Color already exists!");
    }
  };

  return (
    <div>
      <Navigation account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>
              <Form mint={mint} />
            </div>
          </main>
        </div>
        <hr />
        <div className="row text-center">
          {colors.map((color, k) => {
            return <Token key={k} color={color} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
