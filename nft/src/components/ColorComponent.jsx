import React from "react";

const ColorComponent = (props) => {
  return (
    <div className="card ml-2 mt-2">
      <div className="card-body">
        <div className="card-title">{props.color.name}</div>
      </div>

      <div
        className="token m-3"
        style={{ backgroundColor: props.color.name }}
      ></div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{"Id: " + parseInt(props.color.id)}</li>
        <li
          className="list-group-item"
          onDoubleClick={() => {
            let inputPrice = prompt("New price");
            if (inputPrice) {
              if (/^[\d]+$/.test(inputPrice)) {
                props.newPrice(props.color.id, inputPrice);
              } else {
                alert(
                  "The data entered do not correspond to the numerical format."
                );
              }
            }
          }}
        >
          {"Price: " + parseInt(props.color.price)}
        </li>
        <li className="list-group-item">
          {"Is for sale: " + props.color.isForSale.toString()}
        </li>
      </ul>

      <button
        onClick={() => {
          props.putUpForSale(props.color.id, !props.color.isForSale);
        }}
        className="btn btn-primary"
      >
        {props.color.isForSale === false ? "Sell" : "Sell out"}
      </button>
    </div>
  );
};

export default ColorComponent;
