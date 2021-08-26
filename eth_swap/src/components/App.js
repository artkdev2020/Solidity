import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import Web3 from "web3";
import Navbar from "./Navbar";
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import Main from "./Main";

const SET_ACCOUNT = "SET_ACCOUNT";
const SET_ETH_BALANCE = "SET_ETH_BALANCE";
const SET_TOKEN = "SET_TOKEN";
const SET_TOKEN_BALANCE = "SET_TOKEN_BALANCE";
const SET_ETH_SWAP = "SET_ETH_SWAP";
const SET_LOADING = "SET_LOADING";

const initialState = {
  account: "",
  ethBalance: "",
  token: {},
  tokenBalance: "",
  ethSwap: {},
  loading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return { ...state, account: action.account };

    case SET_ETH_BALANCE:
      return { ...state, ethBalance: action.ethBalance };

    case SET_TOKEN:
      return { ...state, token: action.token };

    case SET_TOKEN_BALANCE:
      return { ...state, tokenBalance: action.tokenBalance };

    case SET_ETH_SWAP:
      return { ...state, ethSwap: action.ethSwap };

    case SET_LOADING:
      return { ...state, loading: action.loading };

    default:
      throw new Error();
  }
};

const App = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
      dispatch({ type: SET_ACCOUNT, account: accounts[0] });
      const ethBalance = await web3.eth.getBalance(accounts[0]);
      console.log(ethBalance);
      dispatch({ type: SET_ETH_BALANCE, ethBalance });

      const networkId = await web3.eth.net.getId();
      const tokenData = Token.networks[networkId];

      if (tokenData) {
        const token = new web3.eth.Contract(Token.abi, tokenData.address);
        dispatch({ type: SET_TOKEN, token });

        let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
        dispatch({ type: SET_TOKEN_BALANCE, tokenBalance });
      } else {
        window.alert("Token contract not deployed network data");
      }

      const ethSwapData = EthSwap.networks[networkId];
      if (ethSwapData) {
        const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
        dispatch({ type: SET_ETH_SWAP, ethSwap });
      } else {
        window.alert("EthSwap contract not deployed to detected network.");
      }

      dispatch({ type: SET_LOADING, loading: false });
    };

    loadBlockchainData();
  }, [state.account]);

  useEffect(() => {
    console.log(state.loading);
    if (state.loading) {
      setContent(
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    } else {
      setContent(
        <Main
          ethBalance={state.ethBalance.toString()}
          tokenBalance={state.tokenBalance.toString()}
          buyTokens={buyTokens}
          sellTokens={sellTokens}
        />
      );
    }
  }, [state.loading]);

  const buyTokens = etherAmount => {
    dispatch({ type: SET_LOADING, loading: true });
    state.ethSwap.methods
      .buyToken()
      .send({ value: etherAmount, from: state.account })
      .on("transactionHash", hash => {
        dispatch({ type: SET_LOADING, loading: false });
      });
  };

  const sellTokens = tokenAmount => {
    dispatch({ type: SET_LOADING, loading: true });
    state.token.methods
      .approve(state.ethSwap.address, tokenAmount)
      .send({ from: state.account })
      .on("transactionHash", hash => {
        state.ethSwap.methods
          .sellToken(tokenAmount)
          .send({ from: state.account })
          .on("transactionHash", hash => {
            dispatch({ type: SET_LOADING, loading: false });
          });
      });
  };

  return (
    <div>
      <Navbar account={state.account} />
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
