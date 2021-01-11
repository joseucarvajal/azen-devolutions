import React, { CSSProperties } from "react";

import "./digit-word.style.scss";

interface IProps {
  digit: string;
  digitValueStyle?:CSSProperties;
  digitStyle?:CSSProperties;
  displayNumeroText?:boolean;
}
const DigitWord: React.FC<IProps> = ({ digit, digitValueStyle, displayNumeroText=true, digitStyle }) => {  
  return (
    <div className="digit" style={digitStyle}>
      <span className="digit__value" style={digitValueStyle}>{digit}</span>
    </div>
  );
};

export default DigitWord;
