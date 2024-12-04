import React from "react";
import "../style/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <p>email: bar.final.project@gmail.com</p>
      <p>phone: +9720123456789</p>
      <p>משרדי החברה: יגאל אלון 23 בית-שמש</p>
      <p>© 2023 BAR. All rights reserved.</p>
      <ul className="social-networks">
        <li>
          <a href="https://facebook.com">Facebook</a>
        </li>
        <li>
          <a href="https://twitter.com">Twitter</a>
        </li>
        <li>
          <a href="https://instagram.com">Instagram</a>
        </li>
      </ul>
      <p className="created">Created by: Ben&Zip developers</p>
    </footer>
  );
};

export default Footer;
