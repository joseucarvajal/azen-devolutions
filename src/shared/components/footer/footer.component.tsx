import React from "react";

import "./footer.style.scss";
import azenLogo from "../../../assets/img/azen-logo.jpg";

const Footer = () => {
  return (
    <div className="footer-info">
      <img src={azenLogo} alt="Logo azen" className="footer-info__img" />
      <span className="footer-info__txt">&copy; Consultoría en Sistemas 2020</span>
    </div>
  );
};

export default Footer;
