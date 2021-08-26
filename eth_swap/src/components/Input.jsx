import React, { useState } from "react";
import "./Input.css";

const Input = props => {
  const [userInput, setUserInput] = useState("");

  return (
    <div>
      <div>
        <label className="float-left">
          <b>Input</b>
        </label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(props.balance, "Ether")}
        </span>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          onChange={event => {
            const amount = userInput.value.toString();
            props.setInput(amount);
            props.setAmount(amount);
          }}
          ref={input => {
            setUserInput(input);
          }}
          className="form-control form-control-lg"
          placeholder="0"
          required
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <div className="row width_group_iput">
              <div className="col-5">
                <img src={props.logo} height="30" width="30" alt="" />
              </div>
              <div className="col align-self-center">{props.currency}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
