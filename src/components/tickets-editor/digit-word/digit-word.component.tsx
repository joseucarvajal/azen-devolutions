import React from "react";

import "./digit-word.style.scss";

const digitWords = [
  "Cero",
  "Uno",
  "Dos",
  "Tres",
  "Cuatro",
  "Cinco",
  "Seis",
  "Siete",
  "Ocho",
  "Nueve",
];

interface IProps {
  digit: string;
}
const DigitWord: React.FC<IProps> = (props) => {

  const { digit } = props;

  const digitClass = digit === '4' || digit === '9'
        ? 'digit__frac digit__frac--4-9'
        : 'digit__frac';

  return (
    <div className="digit">
      <span className="digit__value">{digit}</span>
      <span className={digitClass}>{digitWords[+digit]}</span>
    </div>
  );
};

export default DigitWord;
