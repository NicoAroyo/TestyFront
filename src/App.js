import React, { useEffect } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AdminView } from "./views/admin/AdminView";
import { ManageTestsView } from "./views/admin/ManageTestsView";
import { ManageQuestionsView } from "./views/admin/ManageQuestionsView";
import { Reports } from "./views/admin/Reports";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { AddQuestionView } from "./views/admin/AddQuestionView";
import { AddTest } from "./views/admin/AddTest";
import { ChooseTestView } from "./views/taketest/ChooseTestView";
import { TakeTestView } from "./views/taketest/TakeTestView";
import { BackendService } from "./service/backendService";

export const App = () => {
  useEffect(() => {
    //   fetch("http://localhost:5000/api/quizes/")
    //     .then((x) => x.json())
    //     .then((x) => console.log(x));
    const questionService = new BackendService("questions");
    questionService
      .getAllAsync()
      .then((x) => console.log(x))
      .catch((err) => console.log(err));
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="admin" element={<AdminView />}></Route>

        <Route
          path="admin/manage-tests/:topicId"
          element={<ManageTestsView />}
        ></Route>

        <Route
          path="admin/manage-tests/:topicId/add"
          element={<AddTest />}
        ></Route>

        <Route path="admin/reports" element={<Reports />}></Route>

        <Route
          path="admin/manage-questions"
          element={<ManageQuestionsView />}
        ></Route>
        <Route
          path="admin/manage-questions/add"
          element={<AddQuestionView />}
        ></Route>
        <Route path="choose-test" element={<ChooseTestView />}></Route>
        <Route path="take-test/:testId" element={<TakeTestView />}></Route>
      </Routes>
    </>
  );
};
