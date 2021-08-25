import React, { useState } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import Input from "./Input";
import Output from "./Output";

const SellForm = props => {
  const [output, setOutput] = useState("0");
  const [input, setInput] = useState("0");

  const setOutputState = amount => {
    setOutput(amount / 100);
  };

  return (
    <form
      className="mb-3"
      onSubmit={event => {
        event.preventDefault();
        let etherAmount = input.toString();
        etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
        props.sellTokens(etherAmount);
      }}
    >
      <Input
        balance={props.tokenBalance}
        setAmount={setOutputState}
        setInput={setInput}
        logo={tokenLogo}
        currency={"DApp"}
      />
      <Output
        balance={props.ethBalance}
        convertedOutput={output}
        logo={ethLogo}
        currencyRate={"100 DApp = 1 ETH"}
        currency={"ETH"}
      />

      <button type="submit" className="btn btn-primary btn-block btn-lg">
        SWAP!
      </button>
    </form>
  );
};

export default SellForm;
