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

const Main = () => {
  const [currentForm, setCurrentForm] = useState("buy");

  return (
    <Container id="content">
      <ButtonsContainer>
        <Button onClick={() => setCurrentForm("buy")}>Buy</Button>
        <Arrows>&lt; &nbsp; &gt;</Arrows>
        <Button onClick={() => setCurrentForm("sell")}>Sell</Button>
      </ButtonsContainer>

      <CardContainer>
        <CardContent>
          {currentForm === "buy" ? <BuyForm /> : <SellForm />}
        </CardContent>
      </CardContainer>
    </Container>
  );
};

export default Main;
