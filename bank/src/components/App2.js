/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import { Tabs, Tab } from "react-bootstrap";
import Web3API from "../api/web3_api";

const App = (props) => {

  const [web3, setWeb3] = useState("");
  const [account, setAccount] = useState("");
  const [token, setToken] = useState({});
  const [dbank, setDbank] = useState({});
  const [balance, setBalance] = useState(0);
  const [dBankAddress, setDBankAddress] = useState({});
  const [depositAmount, setDepositAmount] = useState({});

  const contract = {
    setWeb3,
    setAccount,
    setToken,
    setDbank,
    setBalance,
    setDBankAddress
  }

  useEffect(() => {
    Web3API.loadBlockchainData(props.dispatch, contract);
  }, []);
  
  const deposit = async (amount) => {
    if(dbank !== "undefined") {
      try {
        await dbank.methods.deposit().send({value: amount.toString(), from: account})
      } catch (ex) {
        console.log("Error, deposit: ", ex);
      }
    }
  }

  const withDraw = async (e) => {
    e.preventDefault();
    if(dbank !== "undefined") {
      try{
        await dbank.methods.withdraw().send({from: account});
      } catch(ex){
        console.log("Error, withdraw: ", ex);
      }
    }
  }

  return (
    <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
        <img src={dbank} className="App-logo" alt="logo" height="32"/>
          <b>dBank</b>
        </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>Welcome to dBank</h1>
          <h2>{account}</h2>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="deposit" title="Deposit">
                  <div>
                    <br />
                    How much do you want to deposit?
                    <br />
                    (min. amount is 0.01 ETH)
                    <br />
                    (1 deposit is possible at the time)
                    <br />
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      let amount = depositAmount.value;
                      amount = amount * 10 **18; // convert to wei
                      deposit(amount);
                    }}>
                      <div className="form-group mr-sm-2">
                      <br />
                      <input 
                        id="depositAmount"
                        step="0.01"
                        type="number"
                        className="form-control form-control-md"
                        placeholder="amount..."
                        required
                        ref={(input) => {setDepositAmount(input)}}
                      />
                      </div>
                      <button type="submit" className="btn btn-primary">DEPOSIT</button>
                      </form>
                  </div>
                </Tab>
                <Tab eventKey="withdraw" title="Withdraw">
                  <div>
                    <br />
                    Do you want to with draw + take interest?
                    <br />
                    <br />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary" onClick={e => withDraw(e)}>
                      WITHDRAW
                    </button>
                  </div>
                </Tab>
              </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
  );
}

export default App;