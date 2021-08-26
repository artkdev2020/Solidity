import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Navbar from "./Navbar";
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import Main from "./Main";

const App = props => {
  const [account, setAccount] = useState();
  const [ethBalance, setEthBalance] = useState();
  const [token, setToken] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [ethSwap, setEthSwap] = useState();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non ethereum browser detected. You should consider trying Metavask!"
        );
      }
    };
    loadWeb3();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const ethBalance = await web3.eth.getBalance(accounts[0]);
      setEthBalance(ethBalance);

      const networkId = await web3.eth.net.getId();
      const tokenData = Token.networks[networkId];

      if (tokenData) {
        const token = new web3.eth.Contract(Token.abi, tokenData.address);
        setToken(token);
        let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
        setTokenBalance(tokenBalance.toString());
      } else {
        window.alert("Token contract not deployed network data");
      }

      const ethSwapData = EthSwap.networks[networkId];
      if (ethSwapData) {
        const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
        setEthSwap(ethSwap);
      } else {
        window.alert("EthSwap contract not deployed to detected network.");
      }

      setLoading(false);
    };

    loadBlockchainData();
  }, []);

  useEffect(() => {
    if (loading) {
      setContent(
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    } else {
      setContent(
        <Main
          ethBalance={ethBalance}
          tokenBalance={tokenBalance}
          buyTokens={buyTokens}
          sellTokens={sellTokens}
        />
      );
    }
  }, [loading]);

  const buyTokens = etherAmount => {
    setLoading(true);
    ethSwap.methods
      .buyToken()
      .send({ value: etherAmount, from: account })
      .on("transactionHash", hash => {
        setLoading(false);
      });
  };

  const sellTokens = tokenAmount => {
    setLoading(true);
    token.methods
      .approve(ethSwap.address, tokenAmount)
      .send({ from: account })
      .on("transactionHash", hash => {
        ethSwap.methods
          .sellToken(tokenAmount)
          .send({ from: account })
          .on("transactionHash", hash => {
            setLoading(false);
          });
      });
  };

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mr-auto ml-auto">{content}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
