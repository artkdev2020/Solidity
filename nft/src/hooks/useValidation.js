import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [isColor, setIsColor] = useState(false);
  const [isMinLengthError, setIsMinLengthError] = useState(false);
  const [isMaxLengthError, setIsMaxLengthError] = useState(false);
  const [textError, setTextError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          if (value.length < validations[validation]) {
            setIsMinLengthError(true);
            setTextError("Длина ниже допустимого диапазона");
            setIsValid(false);
          } else {
            setIsMinLengthError(false);
            setIsValid(true);
          }
          break;

        case "maxLength":
          if (value.length > validations[validation]) {
            setIsMaxLengthError(true);
            setTextError("Длина выше допустимого диапазона");
            setIsValid(false);
          } else {
            setIsMaxLengthError(false);
            setIsValid(true);
          }
          break;

        case "isEmpty":
          if (value !== "") {
            setEmpty(false);
            setIsValid(true);
          } else {
            setEmpty(true);
            setTextError("Поле не может быть пустым");
            setIsValid(false);
          }
          break;

        case "isColor":
          const reg = /^#[0-9a-f]{3,6}$/i;
          if (reg.test(value)) {
            setIsColor(false);
            setIsValid(true);
          } else {
            setIsColor(true);
            setTextError("Введенное значение - не соответствует формату цвета");
            setIsValid(false);
          }
          break;
        default:
      }
    }
  }, [value, validations]);

  return {
    isEmpty,
    isColor,
    isMinLengthError,
    isMaxLengthError,
    textError,
    isValid
  };
};

export default useValidation;
