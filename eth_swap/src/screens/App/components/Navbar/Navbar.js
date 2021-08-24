import React from "react";
import Identicon from "identicon.js";

import {
  NavContainer,
  Ref,
  NavbarContent,
  AccountNameContainer,
  AccountName,
  AccountImage,
} from "./styles";

const Navbar = ({ account }) => (
  <NavContainer>
    <Ref
      href="http://www.dappuniversity.com/bootcamp"
      target="_blank"
      rel="noopener noreferrer"
    >
      EthSwap
    </Ref>

    <NavbarContent>
      <AccountNameContainer className="text-secondary">
        <AccountName id="account">{account}</AccountName>
      </AccountNameContainer>

      {account ? (
        <AccountImage
          src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
          alt=""
        />
      ) : null}
    </NavbarContent>
  </NavContainer>
);

export default Navbar;
