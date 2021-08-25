import React, { useState } from "react";

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
            <img src={props.logo} height="32" alt="" />
            {props.currency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
