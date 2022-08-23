import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("login")}>Log in as admin</button>
      <button>continue as student</button>
    </div>
  );
};