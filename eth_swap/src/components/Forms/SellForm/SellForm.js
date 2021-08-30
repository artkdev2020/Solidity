import React, { useState, useEffect } from "react";
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
} from "../styles";

const SellForm = ({
  sellTokens,
  ethBalance,
  tokenBalance,
  calculatedEthBalance,
  calculatedTokenBalance,
  calculateEthBalance,
  calculateTokenBalance,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  useEffect(() => {
    calculateEthBalance();
  }, [ethBalance]);

  useEffect(() => {
    calculateTokenBalance();
  }, [tokenBalance]);

  const changeInputValue = (event) => {
    const tokenAmount = event.target.value;
    setInputValue(tokenAmount.toString());
    setOutputValue((tokenAmount / 100).toString());
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const etherAmount = window.web3.utils.toWei(inputValue, "Ether");
    sellTokens(etherAmount.toString());
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <BalanceContainer>
        <Label>Input</Label>
        <BalanceSpan>Balance: {calculatedTokenBalance}</BalanceSpan>
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
          <TokenLogo src={tokenLogo} height="32" alt="" />
          &nbsp; DApp
        </IconContainer>
      </InputContainer>
      <BalanceContainer>
        <Label>Output</Label>
        <BalanceSpan>Balance: {calculatedEthBalance}</BalanceSpan>
      </BalanceContainer>
      <InputContainer>
        <Input type="text" placeholder="0" value={outputValue} disabled />
        <IconContainer>
          <TokenLogo src={ethLogo} height="32" alt="" />
          &nbsp;&nbsp;&nbsp; ETH
        </IconContainer>
      </InputContainer>
      <RowContainer>
        <ExchangeRateLabel>Exchange Rate</ExchangeRateLabel>
        <ExchangeRateValue>100 DApp = 1 ETH</ExchangeRateValue>
      </RowContainer>
      <SwapButton type="submit">SWAP!</SwapButton>
    </Form>
  );
};

export default SellForm;
