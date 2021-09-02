import { createSelector } from "@reduxjs/toolkit";

const getWeb3Status = (state) => state.status;
const getWeb3Info = (state) => state.web3Info;
const getCalculatedBalance = (state) => state.calculatedBalance;

export const getCurrentForm = (state) => state.currentForm;

export const getLoading = createSelector(
  getWeb3Status,
  (status) => status.loading
);

export const getWeb3Loaded = createSelector(
  getWeb3Status,
  (status) => status.web3Loaded
);

export const getAccount = createSelector(
  getWeb3Info,
  (web3Info) => web3Info.account
);

export const getToken = createSelector(
  getWeb3Info,
  (web3Info) => web3Info.token
);

export const getEthSwap = createSelector(
  getWeb3Info,
  (web3Info) => web3Info.ethSwap
);

export const getEthBalance = createSelector(
  getWeb3Info,
  (web3Info) => web3Info.ethBalance
);

export const getTokenBalance = createSelector(
  getWeb3Info,
  (web3Info) => web3Info.tokenBalance
);

export const getCalculatedEthBalance = createSelector(
  getCalculatedBalance,
  (balance) => balance.eth
);

export const getCalculatedTokenBalance = createSelector(
  getCalculatedBalance,
  (balance) => balance.token
);
