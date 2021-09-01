import React from "react";

const MyCoin = (props) => {
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
        <li
          className="list-group-item"
          onDoubleClick={() => {
            let inputPrice = prompt("New price");
            if (inputPrice) {
              if (/^[\d]+$/.test(inputPrice)) {
                props.newPrice(props.coin.id, inputPrice);
              } else {
                alert(
                  "The data entered do not correspond to the numerical format."
                );
              }
            }
          }}
        >
          {"Price: " + parseInt(props.coin.price)}
        </li>
        <li className="list-group-item">
          {"Is for sale: " + props.coin.isForSale.toString()}
        </li>
      </ul>

      <button
        onClick={() => {
          props.putUpForSale(props.coin.id, !props.coin.isForSale);
        }}
        className="btn btn-primary"
      >
        {props.coin.isForSale === false ? "Sell" : "Sell out"}
      </button>
    </div>
  );
};

export default MyCoin;
