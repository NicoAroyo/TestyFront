import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AdminView } from "./views/admin/AdminView";
import { Home } from "./views/Home";
import { Login } from "./views/Login";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="admin" element={<AdminView />}></Route>
      </Routes>
    </>
  );
};
