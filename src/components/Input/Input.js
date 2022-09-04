import React from "react";
import "./Input.scss";

export const Input = (props) => {
  return (
    <input className="input" {...props}>
      {props.children}
    </input>
  );
};

export const Textarea = (props) => {
  return (
    <textarea className="txtarea" {...props}>
      {props.children}
    </textarea>
  );
};
