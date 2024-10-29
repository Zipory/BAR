import React from "react";
const tie = require("../images/tie.png");
const Logo = () => {
  return (
    <header>
      <h1>
        AR
        <img
          class="rotate-90"
          src={tie}
          alt="tie"
          width="50px"
          height="26px"
          objectFit="cover"
        />
      </h1>
    </header>
  );
};

export default Logo;
