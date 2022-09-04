import React from "react";
import "./Header.scss";

export const Header = (props) => {
  return (
    <h2 className="header" {...props}>
      {props.children}
    </h2>
  );
};
