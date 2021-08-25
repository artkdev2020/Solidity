import React, { Component } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import Input from "./Input";
import Output from "./Output";

class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "0",
      input: "0"
    };
  }

  setOutput = amount => {
    this.setState({ output: amount * 100 });
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
          this.props.buyTokens(etherAmount);
        }}
      >
        <Input
          balance={this.props.ethBalance}
          setAmount={this.setOutput}
          setInput={this.setInput}
          logo={ethLogo}
          currency={"ETH"}
        />
        <Output
          balance={this.props.tokenBalance}
          convertedOutput={this.state.output}
          logo={tokenLogo}
          currencyRate={"1 ETH = 100 DApp"}
          currency={"DApp"}
        />

        <button type="submit" className="btn btn-primary btn-block btn-lg">
          SWAP!
        </button>
      </form>
    );
  }
}

export default BuyForm;
