import React, { useState, useEffect } from "react";
import { Popover, Cover } from "./style";
import { HexColorPicker } from "react-colorful";

const Form = ({ mint }) => {
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

    // if (event.target.value.length === 7) {
    //   var regExp = /^[a-fA-F0-9]{6}|[a-fA-F0-9]{3}$/;
    //   if (!regExp.test(event.target.value)) {
    //     alert("not valid!");
    //     setInputColor(color);
    //   } else {
    //     setInputColor(event.target.value);
    //     setColor(event.target.value);
    //   }
    // }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const _color = inputColor;
        mint(_color);
      }}
    >
      <input
        type="text"
        className="form-control mb-1"
        placeholder="e.g. #FFFFFF"
        value={inputColor}
        onChange={handleValidation}
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
          <HexColorPicker color={inputColor} onChange={setInputColor} />;
        </Popover>
      ) : null}
    </form>
  );
};

export default Form;
