import React, { useState } from "react";
import { Popover, Cover } from "./style";
import { HexColorPicker } from "react-colorful";

const Form = ({ mint }) => {
  let inputColor;
  const [color, setColor] = useState("#4FAAA2");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleValidation = (event) => {
    setColor(event.target.value);

    if (event.target.value.length === 7) {
      var regExp = /^[0[xX][0-9a-fA-F]+$/;
      if (!regExp.test(event.target.value)) {
        alert("not valid!");
        setColor("#FFFFFF");
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const _color = inputColor.value;
        mint(_color);
      }}
    >
      <input
        type="text"
        className="form-control mb-1"
        placeholder="e.g. #FFFFFF"
        value={color}
        onChange={handleValidation}
        ref={(input) => {
          inputColor = input;
        }}
      />
      <input type="submit" className="btn btn-block btn-primary" value="MINT" />
      <input
        className="btn btn-block btn-primary"
        value="PICK COLOR"
        onClick={handleClick}
      />
      {displayColorPicker ? (
        <Popover>
          <Cover onClick={handleClose} />
          <HexColorPicker color={color} onChange={setColor} />;
        </Popover>
      ) : null}
    </form>
  );
};

export default Form;
