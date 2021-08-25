import React, { useEffect, useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const Main = props => {
  const [currentForm, setCurrentForm] = useState("buy");
  const [content, setContent] = useState();
  useEffect(() => {
    if (currentForm === "buy") {
      setContent(
        <BuyForm
          ethBalance={props.ethBalance}
          tokenBalance={props.tokenBalance}
          buyTokens={props.buyTokens}
        />
      );
    } else {
      setContent(
        <SellForm
          ethBalance={props.ethBalance}
          tokenBalance={props.tokenBalance}
          sellTokens={props.sellTokens}
        />
      );
    }
  }, [currentForm]);

  return (
    <div id="content" className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-light"
          onClick={event => {
            setCurrentForm("buy");
          }}
        >
          Buy
        </button>
        <span className="text-muted">&lt; &nbsp; &gt;</span>
        <button
          className="btn btn-light"
          onClick={event => {
            setCurrentForm("self");
          }}
        >
          Sell
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">{content}</div>
      </div>
    </div>
  );
};

export default Main;
