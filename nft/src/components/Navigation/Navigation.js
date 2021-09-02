import React from "react";
import { Container, UserContainer } from "./style";

const Navigation = ({ account }) => {
  return (
    <Container bgColor="#1d1f27">
      <UserContainer>
        <span>{account}</span>
      </UserContainer>
    </Container>
  );
};

export default Navigation;
