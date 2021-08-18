import React from "react";
import { Container, UserContainer } from "./style";

const Token = ({ color }) => {
    return (
        <div className="col-md-3 mb-3">
          <div className="token" style={{ backgroundColor: color }}></div>
          <div>{color}</div>
        </div>
      );
};

export default Token;
