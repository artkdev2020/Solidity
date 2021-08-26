import React from "react";
import "./Input.css";

const Output = props => {
  debugger;
  console.log(props.balance);

  return (
    <div>
      <div>
        <label className="float-left">
          <b>Output</b>
        </label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(props.balance, "Ether")}
        </span>
      </div>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="0"
          value={props.convertedOutput}
          disabled
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <div className="row width_group_iput">
              <div className="col-5">
                <img src={props.logo} height="30" alt="" />
              </div>
              <div className="col align-self-center">{props.currency}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <span className="float-left text-muted">Exchange Rate</span>
        <span className="float-right text-muted">{props.currencyRate}</span>
      </div>
    </div>
  );
};

export default Output;
