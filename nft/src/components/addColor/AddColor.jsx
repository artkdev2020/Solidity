import React, { useState } from "react";

const AddColor = props => {
  let [color, setColor] = useState({});
  return (
    <div className="content mr-auto ml-auto">
      <h1>Issue Token</h1>
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log(color);
          props.mint(color.value);
        }}
      >
        <input
          type="text"
          className="form-control mb-1"
          placeholder="e.g. #fff"
          ref={input => {
            setColor(input);
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

export default AddColor;
