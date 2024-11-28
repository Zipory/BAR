import React from "react";
const tie = require("../img/tie.png");
const Logo = () => {
  return (
    <header>
        <img
          className="rotate-90"
          src={tie}
          alt="tie"
          width="120px"
          height="80px"
          objectfit="cover"
          />
          <h1> BAR</h1>
    </header>
  );
};

export default Logo;
