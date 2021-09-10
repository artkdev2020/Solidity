import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";

const Token = ({ w3, account, color, saleCoin, buyCoin, submitPrice }) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [isInvalidValue, setInvalidValue] = useState(false);
  const [inputValue, setInputValue] = useState(color.price);

  const changePrice = (e) => {
    console.log("change", setIsShowInput(true));
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const validatePrice = () => {
    if (inputValue < 0 || inputValue === "") {
      setInvalidValue(true);
    } else {
      setInvalidValue(false);
      setIsShowInput(false);
      submitPrice(color.id, inputValue);
    }
  };

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
      {isShowInput && color.owner === account ? (
        <div>
          {isInvalidValue ? (
            <Alert variant="warning">
              You`ve entered an invalid value. It should be bigger or equal 0
            </Alert>
          ) : (
            <span></span>
          )}
          <InputGroup className="my-2">
            <FormControl
              placeholder="Price of the token"
              aria-label="Price"
              type="number"
              value={inputValue}
              onChange={(e) => handleChange(e)}
              size="sm"
            />
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => {
                validatePrice();
              }}
            >
              Change
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => {
                setIsShowInput(false);
              }}
            >
              Cancel
            </Button>
          </InputGroup>
        </div>
      ) : (
        <span onClick={() => changePrice()}>
          Price: {w3.utils.fromWei(color.price.toString(), "Ether")} ETH
        </span>
      )}
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
