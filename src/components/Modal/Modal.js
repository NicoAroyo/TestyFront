import React from "react";
import { Button } from "../Button/Button";
import "./Modal.scss";

export const Modal = ({
  display,
  confirm,
  cancel,
  content,
  header,
  buttonContent,
  showOnlyOneButton = false
}) => {
  return (
    <div className={display ? "modal visible" : "modal hidden"}>
      <div className="modal__container">
        <h2>{header}</h2>
        <p>{content}</p>
      </div>
      <div className="modal__button-container">
        <Button onClick={confirm}>{buttonContent}</Button>
       {showOnlyOneButton && <Button onClick={cancel}>Cancel</Button>}
      </div>
    </div>
  );
};
