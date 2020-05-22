import React from "react";

import "./footer-info.style.scss";
import azenLogo from "../../../assets/img/azen-logo.jpg";

const FooterInfo = () => {
  return (
    <div className="footer-info">
      <img src={azenLogo} alt="Logo azen" className="footer-info__img" />
      <span className="footer-info__txt">Azen Consultoría en Sistemas.</span>
    </div>
  );
};

export default FooterInfo;
