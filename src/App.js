import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AdminView } from "./views/admin/AdminView";
import { ViewTests } from "./views/admin/test/ViewTests";
import { ManageQuestionsView } from "./views/admin/question/ViewQuestions";
import { ReportsView } from "./views/admin/reports/ReportsView";
import { AddQuestionView } from "./views/admin/question/AddQuestion";
import { AddTest } from "./views/admin/test/AddTest";
import { ChooseTestView } from "./views/user/taketest/ChooseTestView";
import { TakeTestView } from "./views/user/taketest/TakeTestView";
import { EditTest } from "./views/admin/test/EditTest";
import { EditQuestionView } from "./views/admin/question/EditQuestion";
import { SignUpView } from "./views/SignUpView";
import { Login } from "./views/login/Login";
import { DetailsTest } from "./views/admin/test/DetailsTest";
import "./sass/App.scss";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {/* <Route path="login" element={<Login />}></Route> */}
        <Route path="/admin" element={<AdminView />}></Route>

        <Route path="/:topic/tests/" element={<ViewTests />}></Route>
        <Route path="/:topic/tests/add" element={<AddTest />}></Route>
        <Route path="/:topic/tests/edit/:id" element={<EditTest />}></Route>
        {/* prettier-ignore */}
        <Route path="/:topic/tests/details/:id" element={<DetailsTest />}></Route>

        {/* prettier-ignore */}
        <Route path="/:topic/questions/" element={<ManageQuestionsView />}></Route>
        {/* prettier-ignore */}
        <Route path="/:topic/questions/add" element={<AddQuestionView />}></Route>
        {/* prettier-ignore */}
        <Route path="/:topic/questions/edit/:id" element={<EditQuestionView />}></Route>

<<<<<<< HEAD
        <Route path="admin/reports/:topic" element={<ReportsView />}></Route>
=======
        <Route path="admin/reports" element={<ReportsView />}></Route>

        <Route path="choose-test/:userId" element={<ChooseTestView />}></Route>
        {/* prettier-ignore */}
        <Route path="take-test/:userId/:testId" element={<TakeTestView />}></Route>

        <Route path="admin/reports" element={<ReportsView />}></Route>
>>>>>>> 765dc61096d8310d5b47c7fa7e4e5bf0c45f8d8a
        <Route path="choose-test" element={<ChooseTestView />}></Route>
        <Route path="take-test/:id" element={<TakeTestView />}></Route>

        <Route path="/sign-up" element={<SignUpView />}></Route>
      </Routes>
    </>
  );
};
