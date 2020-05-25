import React, { CSSProperties } from "react";

import "./number-word.style.scss";
import DigitWord from "../digit-word/digit-word.component";

interface IProps {
  number: string;
  digitValueStyle?:CSSProperties;
  digitStyle?:CSSProperties;
  displayNumeroText?:boolean;  
}
const NumberWord: React.FC<IProps> = (props) => {

  const { number } = props;

  const digits = number.split("");

  return (
    <div className="number-word">
      {digits.map((digit, i) => (
        <DigitWord key={i} digit={digit} {...props} />
      ))}
    </div>
  );
};

export default NumberWord;
