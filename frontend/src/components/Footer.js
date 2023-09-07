import React from "react";


function Footer() {
  const dateThisYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; {dateThisYear} Mesto Russia</p>
    </footer>
  );
};

export default Footer;