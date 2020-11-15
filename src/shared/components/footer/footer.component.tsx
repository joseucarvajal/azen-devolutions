import React from "react";

import "./footer.style.scss";
import azenLogo from "../../../assets/img/logos-footer.png";

const Footer = () => {
  return (
    <div className="footer-info">
      <img src={azenLogo} alt="Logo azen" className="footer-info__img" />
    </div>
  );
};

export default Footer;
