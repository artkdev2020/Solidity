import React from "react";
import { BuyForm, SellForm } from "../Forms";

import {
  Container,
  ButtonsContainer,
  Button,
  Arrows,
  CardContainer,
  CardContent,
} from "./styles";

const Main = ({ currentForm, changeCurrentForm }) => {
  return (
    <Container id="content">
      <ButtonsContainer>
        <Button onClick={() => changeCurrentForm("buy")}>Buy</Button>
        <Arrows>&lt; &nbsp; &gt;</Arrows>
        <Button onClick={() => changeCurrentForm("sell")}>Sell</Button>
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
