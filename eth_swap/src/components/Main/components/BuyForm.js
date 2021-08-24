import React, { useState } from "react";
import { ethLogo, tokenLogo } from "../../../assets/images";

import {
  Form,
  BalanceContainer,
  Label,
  BalanceSpan,
  InputContainer,
  Input,
  IconContainer,
  TokenLogo,
  RowContainer,
  ExchangeRateLabel,
  ExchangeRateValue,
  SwapButton,
} from "./styles";

const BuyForm = ({ buyTokens, ethBalance, tokenBalance }) => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const changeInputValue = (event) => {
    const etherAmount = event.target.value;
    setInputValue(etherAmount.toString());
    setOutputValue((etherAmount * 100).toString());
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const etherAmount = window.web3.utils.toWei(inputValue, "Ether");
    buyTokens(etherAmount);
  };

  return (
    <Form className="mb-3" onSubmit={onFormSubmit}>
      <BalanceContainer>
        <Label>Input</Label>
        <BalanceSpan>
          Balance: {window.web3.utils.fromWei(ethBalance, "Ether")}
        </BalanceSpan>
      </BalanceContainer>
      <InputContainer>
        <Input
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          placeholder="0"
          required
        />
        <IconContainer>
          <TokenLogo src={ethLogo} height="32" alt="" />
          &nbsp;&nbsp;&nbsp; ETH
        </IconContainer>
      </InputContainer>
      <BalanceContainer>
        <Label>Output</Label>
        <BalanceSpan>
          Balance:
          {window.web3.utils.fromWei(tokenBalance, "Ether")}
        </BalanceSpan>
      </BalanceContainer>
      <InputContainer>
        <Input type="text" placeholder="0" value={outputValue} disabled />
        <IconContainer>
          <TokenLogo src={tokenLogo} height="32" alt="" />
          &nbsp; DApp
        </IconContainer>
      </InputContainer>
      <RowContainer>
        <ExchangeRateLabel>Exchange Rate</ExchangeRateLabel>
        <ExchangeRateValue>1 ETH = 100 DApp</ExchangeRateValue>
      </RowContainer>
      <SwapButton type="submit">SWAP!</SwapButton>
    </Form>
  );
};

export default BuyForm;
