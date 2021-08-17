import React, { useState } from "react";

const Add = props => {
  let [color, setColor] = useState("");
  return (
    <div className="content mr-auto ml-auto">
      <h1>Issue Token</h1>
      <form
        onSubmit={event => {
          event.preventDefault();
          debugger;
          console.log(color);
          // props.mint(color);
          // const color = props.color.value;
          // props.mint(color);
        }}
      >
        <input
          type="text"
          className="form-control mb-1"
          placeholder="e.g. #fff"
          ref={input => {
            setColor(input?.value);
          }}
        />
        <input
          type="submit"
          className="btn btn-block btn-primary"
          value="MINT"
        />
      </form>
    </div>
  );
};

export default Add;
