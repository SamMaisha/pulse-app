import React from "react";

const footerStyles = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  marginBottom: "10px",
  marginTop: "50px",

  left: 0,
  bottom: 0,
  width: "100%",
  height: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Footer = () => {
  return <div style={footerStyles}>
    <p class="footer-text">© 2023 Pulse</p>
  </div>;
};

export default Footer;
