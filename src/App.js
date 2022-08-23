import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AdminView } from "./views/admin/AdminView";
import { ManageTestsView } from "./views/admin/ManageTestsView";
import { ManageQuestionsView } from "./views/admin/ManageQuestionsView";
import { Reports } from "./views/admin/Reports";
import { Home } from "./views/Home";
import { Login } from "./views/Login";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="admin" element={<AdminView />}></Route>
        <Route path="admin/manage-tests" element={<ManageTestsView />}></Route>
        <Route path="admin/reports" element={<Reports />}></Route>
        <Route
          path="admin/manage-questions"
          element={<ManageQuestionsView />}
        ></Route>
      </Routes>
    </>
  );
};
