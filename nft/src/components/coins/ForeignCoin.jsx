import React from "react";

const ForeignCoin = (props) => {
  const buyCoin = () => {
    let amount = props.coin.price;
    let result = prompt("Enter amount please", amount);
    if (result >= props.coin.price) {
      let tipAmount = window.web3.utils.toWei(`${result}`, "Ether");
      props.transfer(props.ownerAddress, props.coin.id, tipAmount);
    }
  };

  return (
    <div className="card ml-2 mt-2">
      <div className="card-body">
        <div className="card-title">{props.coin.name}</div>
      </div>
      <div
        className="token m-3"
        style={{ backgroundColor: props.coin.name }}
      ></div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{"Id: " + parseInt(props.coin.id)}</li>
        <li className="list-group-item">
          {"Price: " + parseInt(props.coin.price) + " Eth"}
        </li>
      </ul>
      <button onClick={buyCoin} className="btn btn-primary">
        Buy
      </button>
    </div>
  );
};

export default ForeignCoin;

{
  /* <li className="list-group-item">
          {"Is for sale: " + props.coin.isForSale.toString()}
        </li> */
}
