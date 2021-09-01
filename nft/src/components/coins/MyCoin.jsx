import React, { useState, useEffect } from "react";

const MyCoin = (props) => {
  let [title, setTitle] = useState(<></>);

  useEffect(() => {
    if (localStorage.getItem(props.coin.id) === props.account) {
      console.log("hi");
      setTitle(
        <div
          className="card-title btn-danger"
          data-toggle="tooltip"
          data-placement="top"
          title="Продай монетку!!!"
        >
          {props.coin.name}
        </div>
      );
    } else {
      setTitle(<div className="card-title">{props.coin.name}</div>);
    }
  }, []);

  return (
    <div className="card ml-2 mt-2">
      <div className="card-body">{title}</div>

      <div
        className="token m-3"
        style={{ backgroundColor: props.coin.name }}
      ></div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span>Id: </span>
          <span>{parseInt(props.coin.id)}</span>
        </li>
        <li
          className="list-group-item d-flex justify-content-between"
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
          <span>Price:</span>
          <span>{parseInt(props.coin.price) + " Eth"}</span>
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
