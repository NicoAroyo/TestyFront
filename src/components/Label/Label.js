import React from "react";
import "./Label.scss";

export const Label = (props) => {
  return (
    <label className="label" {...props}>
      {props.children}
    </label>
  );
};
