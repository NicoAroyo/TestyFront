import React from "react";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Reports</div>
      <button onClick={() => navigate(-1)}>Back</button>;
    </>
  );
};
