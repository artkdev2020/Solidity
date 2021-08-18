import React from "react";
import useInput from "../../hooks/useInput";

const AddColor = props => {
  // let [color, setColor] = useState({});
  const inputColor = useInput("", { isColor: true });
  const inputIsEmpty = useInput("", { isEmpty: true });
  console.log(inputColor.isValid);

  return (
    <div className="content mr-auto ml-auto">
      <h1>Issue Token</h1>
      <form
        onSubmit={event => {
          event.preventDefault();
          props.mint(inputColor.value);
        }}
      >
        {inputColor.isDirty && inputColor.isColor && (
          <div style={{ color: "red" }}>{inputColor.textError}</div>
        )}
        {inputColor.isDirty && inputIsEmpty.isEmpty && (
          <div style={{ color: "red" }}>{inputIsEmpty.textError}</div>
        )}
        <input
          type="text"
          className="form-control mb-1"
          placeholder="e.g. #fff or #ff00ff"
          value={inputColor.value}
          onChange={e => {
            inputColor.onChange(e);
            inputIsEmpty.onChange(e);
          }}
          onBlur={e => {
            inputColor.onBlur(e);
            inputIsEmpty.onBlur(e);
          }}
        />
        <input
          disabled={!(inputColor.isValid && !inputIsEmpty.isEmpty)}
          type="submit"
          className="btn btn-block btn-primary"
          value="MINT"
        />
      </form>
    </div>
  );
};

export default AddColor;
