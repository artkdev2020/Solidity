import React from "react";

const TabDeposit = (props) => {
  return(
    <div>
      <br />
      How much do you want to deposit?
      <br />
      (min. amount is 0.01 ETH)
      <br />
      (1 deposit is possible at the time)
      <br />
      <form onSubmit={(e) => {
        e.preventDefault();
        let amount = props.depositAmount.value;
        amount = amount * 10 **18; // convert to wei
        props.deposit(amount);
      }}>
        <div className="form-group mr-sm-2">
        <br />
        <input 
          id="depositAmount"
          step="0.01"
          type="number"
          className="form-control form-control-md"
          placeholder="amount..."
          required
          ref={(input) => {props.setDepositAmount(input)}}
        />
        </div>
        <button type="submit" className="btn btn-primary">DEPOSIT</button>
        </form>
    </div>
  );
}

export default TabDeposit;