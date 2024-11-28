import React from "react";
const tie = require("../img/tie.png");
const Logo = () => {
  return (
    <header>
      <h1>
        BAR
        <img
          className="rotate-90"
          src={tie}
          alt="tie"
          width="120px"
          height="80px"
          objectfit="cover"
        />
      </h1>
    </header>
  );
};

export default Logo;
