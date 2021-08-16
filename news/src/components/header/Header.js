import React from "react";
import Identicon from 'identicon.js';
import { Container, Logo, UserContainer } from "./styles";
import { logo } from "../../assets/images";

const Header = ({ name }) => {
  return (
    <Container bgColor="#1d1f27">
      <a
        href="http://www.artkdev.online"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo src={logo} alt="logo" />
      </a>
      <UserContainer>
        <span>{name}</span>
        <img
          width="30px"
          height="30px"
          src={`data:image/png;base64, ${new Identicon(name, 30).toString()}`}
          alt="avatar"
        />
      </UserContainer>
    </Container>
  );
};

export default Header;
