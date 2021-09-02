import React, { useState, useEffect } from "react";
import { Popover, Cover } from "./style";
import { HexColorPicker } from "react-colorful";

const Form = ({ colors, mint }) => {
  const [color, setColor] = useState("#4FAAA2");
  const [inputColor, setInputColor] = useState("#4FAAA2");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleValidation = (event) => {
    setInputColor(event.target.value);

    if (event.target.value.length === 7) {
      var regExp = /^[a-fA-F0-9]{6}|[a-fA-F0-9]{3}$/;
      if (!regExp.test(event.target.value)) {
        alert("not valid!");
        setInputColor(color);
      } else {
        setColor(event.target.value);
      }
    }
  };

  const checkIfColorExists = (color) => {
    let exists = false;

    colors.forEach((c) => {
      if (c.name === color) {
        exists = true;
      }
    });

    return exists;
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (checkIfColorExists(inputColor)) {
          alert("Color already exists!");
        } else {
          mint(inputColor);
        }
      }}
    >
      <input
        type="text"
        className="form-control mb-1"
        placeholder="e.g. #FFFFFF"
        value={inputColor}
        onChange={handleValidation}
      />
      <button className="btn btn-block btn-primary" type="submit">
        MINT
      </button>
      <button
        className="btn btn-block btn-primary"
        onClick={handleClick}
        type="button"
      >
        PICK COLOR
      </button>
      {displayColorPicker ? (
        <Popover>
          <Cover onClick={handleClose} />
          <HexColorPicker color={inputColor} onChange={setInputColor} />;
        </Popover>
      ) : null}
    </form>
  );
};

export default Form;
