import React from "react";

const NoSaleCoin = (props) => {
  const setRate = () => {
    let amount = props.coin.price;
    let result = prompt("Enter amount please", amount);
    if (result >= props.coin.price) {
      localStorage.setItem(props.coin.id, props.ownerAddress);
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
      <button onClick={setRate} className="btn btn-primary">
        Rate
      </button>
    </div>
  );
};

export default NoSaleCoin;
