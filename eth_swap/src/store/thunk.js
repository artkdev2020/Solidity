import { createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import Token from "../abis/Token.json";
import EthSwap from "../abis/EthSwap.json";

import {
  loadWeb3Success,
  loadWeb3Failed,
  loadBlockchainSuccess,
  loadBlockchainFailed,
  loadBlockchainDataSuccess,
  loadBlockchainDataFailed,
  startLoading,
  endLoading,
} from "./reducer";

const LOAD_WEB3 = "LOAD_WEB3";
const LOAD_BLOCKCHAIN_DATA = "LOAD_BLOCKCHAIN_DATA";
const BUY_TOKENS = "BUY_TOKENS";
const SELL_TOKENS = "SELL_TOKENS";

export const loadWeb3 = createAsyncThunk(LOAD_WEB3, async (_, { dispatch }) => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    dispatch(loadWeb3Success());
  } else if (window.web3) {
    console.log("ya tut2");
    window.web3 = new Web3(window.web3.currentProvider);

    dispatch(loadWeb3Success());
  } else {
    dispatch(loadWeb3Failed());

    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
});

export const loadBlockchainData = createAsyncThunk(
  LOAD_BLOCKCHAIN_DATA,
  async (_, { dispatch }) => {
    try {
      const web3 = window.web3;

      let fetchedWeb3Info = {
        account: "",
        token: {},
        ethSwap: {},
        ethBalance: "0",
        tokenBalance: "0",
      };

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      fetchedWeb3Info.account = account;

      const ethBalance = await web3.eth.getBalance(account);
      fetchedWeb3Info.ethBalance = ethBalance;

      // Load Token
      const networkId = await web3.eth.net.getId();
      const tokenData = Token.networks[networkId];
      if (tokenData) {
        const token = new web3.eth.Contract(Token.abi, tokenData.address);
        let tokenBalance = await token.methods.balanceOf(account).call();
        fetchedWeb3Info.token = token;
        fetchedWeb3Info.tokenBalance = tokenBalance
          ? tokenBalance.toString()
          : "0";
      } else {
        throw "Token contract not deployed to detected network";
      }

      // Load EthSwap
      const ethSwapData = EthSwap.networks[networkId];
      if (ethSwapData) {
        const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
        fetchedWeb3Info.ethSwap = ethSwap;
      } else {
        throw "EthSwap contract not deployed to detected network";
      }

      dispatch(loadBlockchainDataSuccess(fetchedWeb3Info));
      dispatch(endLoading());
    } catch (e) {
      dispatch(loadBlockchainDataFailed());
      dispatch(endLoading());

      window.alert(e);
    }
  }
);

export const buyTokens = createAsyncThunk(
  BUY_TOKENS,
  async (etherAmount, { dispatch, getState }) => {
    const { web3Info } = getState();
    const { ethSwap, account } = web3Info;

    dispatch(startLoading());

    ethSwap.methods
      .buyToken()
      .send({ value: etherAmount, from: account })
      .on("transactionHash", (hash) => {
        dispatch(endLoading());
      })
      .on("error", () => {
        dispatch(endLoading());
      });
  }
);

export const sellTokens = createAsyncThunk(
  SELL_TOKENS,
  async (tokenAmount, { dispatch, getState }) => {
    const { web3Info } = getState();
    const { ethSwap, account, token } = web3Info;

    dispatch(startLoading());

    token.methods
      .approve(ethSwap.address, tokenAmount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        ethSwap.methods
          .sellTokens(tokenAmount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            dispatch(endLoading());
          });
      })
      .on("error", () => {
        dispatch(endLoading());
      });
  }
);
