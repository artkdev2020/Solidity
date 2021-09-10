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
  const [w3, setWeb3] = useState([]);

  const fetchColors = async () => {
    let _colors = [];

    for (var i = 0; i < totalSupply; i++) {
      const _color = await contract.methods.coins(i + 1).call();
      _colors.push(_color);
    }

    setColors(_colors);
  };

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        setWeb3(window.web3);
        try {
          await window.ethereum.enable();
        } catch (error) {
          window.alert("User denied account access...");
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        setWeb3(window.web3);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    fetchColors();
  }, [totalSupply]);

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
        setContract(_contract);
        setTotalSupply(_totalSupply);
      } else {
        window.alert(
          "Social Network contract not deployed to detected network"
        );
      }
    };

    loadBlockchainData();
  }, []);

  const mint = (color) => {
    let _colors = Object.assign([], colors);
    _colors.push(color);

    contract.methods
      .mint(color)
      .send({ from: account })
      .on("confirmation", async (confirmation) => {
        const _totalSupply = await contract.methods.totalSupply().call();
        setTotalSupply(_totalSupply);
      });
  };

  const saleCoin = (color) => {
    contract.methods
      .sale(color.id, !color.isForSale)
      .send({ from: account })
      .on("confirmation", (confirmation) => {
        fetchColors();
      });
  };

  const buyCoin = (color) => {
    let _weiPrice = w3.utils.toWei(color.price.toString(), "Ether");
    contract.methods
      .transfer(color.owner, color.id)
      .send({ from: account, value: color.price.toString() })
      .on("confirmation", (confirmation) => {
        fetchColors();
      });
  };

  const submitPrice = (id, price) => {
    let _price = w3.utils.toWei(price.toString(), "Ether");
    contract.methods
      .changePrice(id, _price)
      .send({ from: account })
      .on("confirmation", (confirmation) => {
        fetchColors();
      });
  };

  return (
    <div>
      <Navigation account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>
              <Form colors={colors} mint={mint} />
            </div>
          </main>
        </div>
        <hr />
        <div className="row text-center">
          {colors.map((color, k) => {
            return (
              <Token
                key={k}
                w3={w3}
                color={color}
                account={account}
                saleCoin={saleCoin}
                buyCoin={buyCoin}
                submitPrice={submitPrice}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
