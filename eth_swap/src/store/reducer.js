import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "common",
  initialState: {
    status: {
      loading: true,
      web3Loaded: false,
      blockchainLoaded: false,
    },
    web3Info: {
      account: "",
      token: {},
      ethSwap: {},
      ethBalance: "0",
      tokenBalance: "0",
    },
  },
  reducers: {
    startLoading: (state) => {
      state.status.loading = true;
    },
    endLoading: (state) => {
      state.status.loading = false;
    },
    loadWeb3Success: (state) => {
      state.status.web3Loaded = true;
    },
    loadWeb3Failed: (state) => {
      state.status.web3Loaded = false;
    },
    loadBlockchainSuccess: (state) => {
      state.status.blockchainLoaded = true;
    },
    loadBlockchainFailed: (state) => {
      state.status.blockchainLoaded = false;
    },
    loadBlockchainDataSuccess: (state, action) => {
      state.web3Info.account = action.payload.account;
      state.web3Info.token = action.payload.token;
      state.web3Info.ethSwap = action.payload.ethSwap;
      state.web3Info.ethBalance = action.payload.ethBalance;
      state.web3Info.tokenBalance = action.payload.tokenBalance;
    },
    loadBlockchainDataFailed: (state) => {
      state.web3Info.account = "";
      state.web3Info.token = {};
      state.web3Info.ethSwap = {};
      state.web3Info.ethBalance = "0";
      state.web3Info.tokenBalance = "0";
    },
  },
});

export const {
  startLoading,
  endLoading,
  loadWeb3Success,
  loadWeb3Failed,
  loadBlockchainSuccess,
  loadBlockchainFailed,
  loadBlockchainDataSuccess,
  loadBlockchainDataFailed,
} = slice.actions;

export default slice.reducer;
