import React from "react";

import "./number-word.style.scss";
import DigitWord from "../digit-word/digit-word.component";

interface IProps {
  number: string;
}
const NumberWord: React.FC<IProps> = (props) => {
  const { number } = props;

  const digits = number.split("");

  return (
    <div className="number-word">
      {digits.map((digit) => (
        <DigitWord key={digit} digit={digit} />
      ))}
    </div>
  );
};

export default NumberWord;
