import React from "react";
import Button from "react-bootstrap/Button";

const Token = ({ account, color, saleCoin, buyCoin }) => {
  return (
    <div className="col-md-3 mb-3">
      <div className="token" style={{ backgroundColor: color.name }}></div>
      <div>{color.name}</div>
      <div
        style={{
          fontSize: 10,
          backgroundColor: color.owner === account ? "cyan" : "salmon",
        }}
      >
        {color.owner}
      </div>
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
        }}
      >
        {account === color.owner && (
          <Button
            variant="primary my-3"
            disabled={color.isForSale}
            onClick={() => saleCoin(color)}
          >
            {color.isForSale ? "On sale" : "Sale"}
          </Button>
        )}
        {color.isForSale && account !== color.owner && (
          <Button variant="primary my-3 ml-2" onClick={() => buyCoin(color)}>
            Buy
          </Button>
        )}
      </div>
    </div>
  );
};

export default Token;
