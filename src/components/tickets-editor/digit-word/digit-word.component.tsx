import React, { CSSProperties } from "react";

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
  digitValueStyle?:CSSProperties;
  digitStyle?:CSSProperties;
  displayNumeroText?:boolean;
}
const DigitWord: React.FC<IProps> = ({ digit, digitValueStyle, displayNumeroText=true, digitStyle }) => {  

  const digitClass = digit === '4' || digit === '9'
        ? 'digit__frac digit__frac--4-9'
        : 'digit__frac';

  return (
    <div className="digit" style={digitStyle}>
      <span className="digit__value" style={digitValueStyle}>{digit}</span>
      {displayNumeroText && <span className={digitClass}>{digitWords[+digit]}</span>}      
    </div>
  );
};

export default DigitWord;
