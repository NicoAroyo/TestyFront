import React from "react";
import "./Table.scss";

export const Table = (props) => {
  return (
    <table className="table" {...props}>
      {props.children}
    </table>
  );
};
