import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DaiToken from "../../abis/DaiToken.json";
import DappToken from "../../abis/DappToken.json";
import TokenFarm from "../../abis/TokenFarm.json";
import Navbar from "../Navbar";
import Main from "../Main";

const App = () => {
  const [web3Loaded, setWeb3Loaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    account: "0x0",
    daiToken: {},
    dappToken: {},
    tokenFarm: {},
    daiTokenBalance: "0",
    dappTokenBalance: "0",
    stakingBalance: "0",
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3Loaded(true);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setWeb3Loaded(true);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadDaiTokenData = async (account, networkId) => {
    const web3 = window.web3;
    const data = {
      token: "",
      tokenBalance: "",
    };

    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );

      data.token = daiToken;
      let daiTokenBalance = await daiToken.methods.balanceOf(account).call();

      data.tokenBalance = daiTokenBalance.toString();

      return data;
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }
  };

  const loadDappTokenData = async (account, networkId) => {
    const web3 = window.web3;
    const data = {
      token: "",
      tokenBalance: "",
    };

    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );

      data.token = dappToken;
      let dappTokenBalance = await dappToken.methods.balanceOf(account).call();

      data.tokenBalance = dappTokenBalance.toString();

      return data;
    } else {
      window.alert("DappToken contract not deployed to detected network.");
    }
  };

  const loadTokenFarmData = async (account, networkId) => {
    const web3 = window.web3;
    const data = {
      token: "",
      stakingBalance: "",
    };

    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );

      data.token = tokenFarm;
      let stakingBalance = await tokenFarm.methods
        .stakingBalance(account)
        .call();

      data.stakingBalance = stakingBalance.toString();

      return data;
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const data = {
      account: "",
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: "",
      dappTokenBalance: "",
      stakingBalance: "",
    };

    const accounts = await web3.eth.getAccounts();

    data.account = accounts[0];

    const networkId = await web3.eth.net.getId();

    const daiTokenData = await loadDaiTokenData(data.account, networkId);
    data.daiToken = daiTokenData.token;
    data.daiTokenBalance = daiTokenData.tokenBalance;

    const dappTokenData = await loadDappTokenData(data.account, networkId);
    data.dappToken = dappTokenData.token;
    data.dappTokenBalance = dappTokenData.tokenBalance;

    const tokenFarmData = await loadTokenFarmData(data.account, networkId);
    data.tokenFarm = tokenFarmData.token;
    data.stakingBalance = tokenFarmData.stakingBalance;

    setState(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    if (web3Loaded) {
      loadBlockchainData();
    }
  }, [web3Loaded]);

  const stakeTokens = (amount) => {
    setLoading(true);

    state.daiToken.methods
      .approve(state.tokenFarm._address, amount)
      .send({ from: state.account })
      .on("transactionHash", (hash) => {
        state.tokenFarm.methods
          .stakeTokens(amount)
          .send({ from: state.account })
          .on("transactionHash", (hash) => {
            loadBlockchainData();
          });
      });
  };

  const unstakeTokens = (amount) => {
    setLoading(true);

    state.tokenFarm.methods
      .unstakeTokens()
      .send({ from: state.account })
      .on("transactionHash", (hash) => {
        loadBlockchainData();
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
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              {loading ? (
                <p id="loader" className="text-center">
                  Loading...
                </p>
              ) : (
                <Main
                  daiTokenBalance={state.daiTokenBalance}
                  dappTokenBalance={state.dappTokenBalance}
                  stakingBalance={state.stakingBalance}
                  stakeTokens={stakeTokens}
                  unstakeTokens={unstakeTokens}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
