import React, { Component } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import Input from "./Input";
import Output from "./Output";

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
        <Output
          balance={this.props.ethBalance}
          convertedOutput={this.state.output}
          logo={ethLogo}
          currencyRate={"100 DApp = 1 ETH"}
          currency={"ETH"}
        />

        <button type="submit" className="btn btn-primary btn-block btn-lg">
          SWAP!
        </button>
      </form>
    );
  }
}

export default SellForm;
