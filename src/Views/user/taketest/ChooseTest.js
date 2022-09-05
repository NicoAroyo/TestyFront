import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ChooseTestView = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const { userId } = useParams();

  const beginTest = () => {
    navigate(`/take-test/${userId}/${code}`);
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Enter test code</h2>

        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input onChange={(e) => setCode(e.target.value)}></input>
        </div>
        <button onClick={beginTest}>Enter</button>
      </div>
    </div>
  );
};
