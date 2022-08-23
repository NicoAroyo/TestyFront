import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home } from "./Views/Home";
import { Login } from "./Views/Login";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </>
  );
};
