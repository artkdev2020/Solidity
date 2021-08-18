import React from "react";
import { Container, UserContainer } from "./style";

const Navigation = ({ acount }) => {
  return (
    <Container bgColor="#1d1f27">
      <UserContainer>
        <span>{acount}</span>
      </UserContainer>
    </Container>
  );
};

export default Navigation;
