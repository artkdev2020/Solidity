import React, { useState } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import Input from "./Input";
import Output from "./Output";

const BuyForm = props => {
  const [output, setOutput] = useState("0");
  const [input, setInput] = useState("0");

  const setOutputState = amount => {
    setOutput(amount * 100);
  };

  // const setInputState = input => {
  //   setInput( input);
  // };

  return (
    <form
      className="mb-3"
      onSubmit={event => {
        event.preventDefault();
        let etherAmount = input.toString();
        etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
        props.buyTokens(etherAmount);
      }}
    >
      <Input
        balance={props.ethBalance}
        setAmount={setOutputState}
        setInput={setInput}
        logo={ethLogo}
        currency={"ETH"}
      />
      <Output
        balance={props.tokenBalance}
        convertedOutput={output}
        logo={tokenLogo}
        currencyRate={"1 ETH = 100 DApp"}
        currency={"DApp"}
      />

      <button type="submit" className="btn btn-primary btn-block btn-lg">
        SWAP!
      </button>
    </form>
  );
};

export default BuyForm;
