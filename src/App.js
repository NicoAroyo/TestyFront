import React, { useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AdminView } from "./views/admin/AdminView";
import { ManageTestsView } from "./views/admin/test/ManageTestsView";
import { ManageQuestionsView } from "./views/admin/question/ManageQuestionsView";
import { Reports } from "./views/admin/Reports";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { AddQuestionView } from "./views/admin/question/AddQuestionView";
import { AddTest } from "./views/admin/test/AddTest";
import { ChooseTestView } from "./views/user/taketest/ChooseTestView";
import { TakeTestView } from "./views/user/taketest/TakeTestView";
import { EditTest } from "./views/admin/test/EditTest";
import { EditQuestionView } from "./views/admin/question/EditQuestionView";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="admin" element={<AdminView />}></Route>

        <Route
          path="admin/manage-tests/:topic"
          element={<ManageTestsView />}
        ></Route>

        <Route
          path="admin/manage-tests/:topic/add"
          element={<AddTest />}
        ></Route>

        <Route
          path="admin/manage-tests/:topic/edit/:id"
          element={<EditTest />}
        ></Route>

        <Route path="admin/reports" element={<Reports />}></Route>

        <Route
          path="admin/manage-questions/:topic"
          element={<ManageQuestionsView />}
        ></Route>
        <Route
          path="admin/manage-questions/:topic/add"
          element={<AddQuestionView />}
        ></Route>
        <Route
          path="admin/manage-questions/:topic/edit/:id"
          element={<EditQuestionView />}
        ></Route>
        <Route path="choose-test" element={<ChooseTestView />}></Route>
        <Route path="take-test/:id" element={<TakeTestView />}></Route>
      </Routes>
    </>
  );
};
