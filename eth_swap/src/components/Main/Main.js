import React, { useState } from "react";
import { BuyForm, SellForm } from "./components";

import {
  Container,
  ButtonsContainer,
  Button,
  Arrows,
  CardContainer,
  CardContent,
} from "./styles";

const Main = ({ ethBalance, tokenBalance, buyTokens, sellTokens }) => {
  const [currentForm, setCurrentForm] = useState("buy");

  const getContent = () => {
    if (currentForm === "buy") {
      return (
        <BuyForm
          ethBalance={ethBalance}
          tokenBalance={tokenBalance}
          buyTokens={buyTokens}
        />
      );
    } else {
      return (
        <SellForm
          ethBalance={ethBalance}
          tokenBalance={tokenBalance}
          sellTokens={sellTokens}
        />
      );
    }
  };

  return (
    <Container id="content">
      <ButtonsContainer>
        <Button onClick={() => setCurrentForm("buy")}>Buy</Button>
        <Arrows>&lt; &nbsp; &gt;</Arrows>
        <Button onClick={() => setCurrentForm("sell")}>Sell</Button>
      </ButtonsContainer>

      <CardContainer>
        <CardContent>{getContent()}</CardContent>
      </CardContainer>
    </Container>
  );
};

export default Main;
