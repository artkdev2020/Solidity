import React, { Component } from "react";
import Identicon from "identicon.js";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.artkdev.online"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shalom Or
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-non d-sv-non d-sm-block">
            <small className="text-white">
              <span id="account">{this.props.account}</span>
            </small>
            {this.props.account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                src={`data:image/png;base64, ${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
                alt="avatar icon"
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;