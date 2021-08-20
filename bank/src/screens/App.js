import React, { useState, useEffect } from "react";
import { Tabs } from "react-bootstrap";
import { typeOf } from "react-is";
import Web3 from "web3";

import { Header, Tab } from "../components";

import Dbank from "../abis/dBank.json";
import Token from "../abis/Token.json";
import dbank from "../dbank.png";

const App = () => {
  const [account, setAccount] = useState("undefined");
  const [dBank, setdBank] = useState(null);
  const [dBankAddress, setdBankAddress] = useState(null);
  const [token, setToken] = useState(null);
  const [web3, setWeb3] = useState("undefined");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (typeof window.ethereum !== "undefined") {
        const _web3 = new Web3(window.ethereum);
        const _netId = await _web3.eth.net.getId();
        const _accounts = await _web3.eth.getAccounts();

        if (typeof _accounts[0] !== "undefined") {
          const _balance = await _web3.eth.getBalance(_accounts[0]);
          setAccount(_accounts[0]);
          setBalance(_balance);
        } else {
          alert("Please login with MetaMask");
        }

        setWeb3(_web3);
        try {
          const _token = new _web3.eth.Contract(
            Token.abi,
            Token.networks[_netId].address
          );
          const _dbank = new _web3.eth.Contract(
            Dbank.abi,
            Dbank.networks[_netId].address
          );
          const _dbankAddress = _dbank._address;
          setToken(_token);
          setdBank(_dbank);
          setdBankAddress(_dbankAddress);
        } catch (e) {
          console.error(e);
          alert("Contracts not deplyoed to the current network");
        }
      } else {
        alert("Please install MetaMask");
      }
    };

    loadBlockchainData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getTokenBalance = async () => {
      if (token) {
        const tokenBalance = await token.methods.balanceOf(account).call();
      }
    };

    getTokenBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const deposit = async (amount) => {
    if (dBank !== "undefined") {
      try {
        await dBank.methods
          .deposit()
          .send({ value: amount.toString(), from: account });
      } catch (e) {
        console.error("Error deposit", e);
      }
    }
  };

  const withdraw = async (e) => {
    e.preventDefault();
    if (dBank !== "undefined") {
      try {
        await dBank.methods.withdraw().send({ from: account });
      } catch (e) {
        console.error("Error withdraw: ", e);
      }
    }
  };

  let inputValue;

  return (
    <div className="text-monospace">
      <Header dbank={dbank} />
      <div className="container-fluid mt-5 text-center">
        <br />
        <h1>Welcome to dbank</h1>
        <h2>{account}</h2>
        <br />
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <Tabs defaultkey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="deposit" title="Deposit">
                  <div>
                    <br />
                    How much do you want to deposit?
                    <br />
                    (min. amount is 0.01 ETH)
                    <br />
                    (1 deposit is possible at the time)
                    <br />
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        let amount = inputValue.value;
                        amount = amount * 10 ** 18;
                        deposit(amount);
                      }}
                    >
                      <div className="form-group mr-sm-2">
                        <br />
                        <input
                          id="depositAmount"
                          step="0.01"
                          type="number"
                          className="form-control form-control-md"
                          placeholder="amount..."
                          required
                          ref={(input) => {
                            inputValue = input;
                          }}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        DEPOSIT
                      </button>
                    </form>
                  </div>
                </Tab>
                <Tab eventKey="withdrow" title="Withdrow">
                  <div>
                    <br />
                    Do you want to withdraw + take interest?
                    <br />
                    <br />
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => withdraw(e)}
                      >
                        WITHDRAW
                      </button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
