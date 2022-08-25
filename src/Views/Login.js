import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Login Screen x)</h1>
      <button onClick={() => navigate("/admin")}>login</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
};
