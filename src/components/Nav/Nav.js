import React from "react";

export const Nav = (props) => {
  return (
    <nav className="nav" {...props}>
      {props.children}
    </nav>
  );
};
