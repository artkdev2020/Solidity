import React, { Component } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import Input from "./Input";

class SellForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "0",
      input: "0"
    };
  }

  setOutput = amount => {
    this.setState({ output: amount / 100 });
  };

  setInput = input => {
    this.setState({ input });
  };

  render() {
    return (
      <form
        className="mb-3"
        onSubmit={event => {
          event.preventDefault();
          let etherAmount = this.state.input.toString();
          etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
          this.props.sellTokens(etherAmount);
        }}
      >
        <Input
          balance={this.props.tokenBalance}
          setAmount={this.setOutput}
          setInput={this.setInput}
          logo={tokenLogo}
          currency={"DApp"}
        />

        <div>
          <label className="float-left">
            <b>Output</b>
          </label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.ethBalance, "Ether")}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height="32" alt="" />
              &nbsp;&nbsp;&nbsp; ETH
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">100 DApp = 1 ETH</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">
          SWAP!
        </button>
      </form>
    );
  }
}

export default SellForm;
