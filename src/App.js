import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AdminView } from "./views/admin/AdminView";
import { ViewTests } from "./views/admin/test/ViewTests";
import { ManageQuestionsView } from "./views/admin/question/ViewQuestions";
import { ReportsView } from "./views/admin/reports/ReportsView";
import { AddQuestionView } from "./views/admin/question/AddQuestion";
import { AddTest } from "./views/admin/test/AddTest";
import { ChooseTestView } from "./views/user/taketest/ChooseTest";
import { TakeTest } from "./views/user/taketest/TakeTest";
import { EditTest } from "./views/admin/test/EditTest";
import { EditQuestionView } from "./views/admin/question/EditQuestion";
import { SignUp } from "./views/login/SignUp";
import { Login } from "./views/login/Login";
import { DetailsTest } from "./views/admin/test/DetailsTest";
import "./sass/App.scss";
import { ReportForTestView } from "./views/admin/reports/ReportForTestView";
import { EndOfTest } from "./views/user/taketest/EndOfTest";
import { AnswersView } from "./views/admin/reports/AnswersView";

export const App = () => {
  return (
    <>
      <Routes>
        //LOGIN
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        //ADMIN - TESTS
        <Route path="/admin/:id" element={<AdminView />}></Route>
        <Route path="/:topic/tests/" element={<ViewTests />}></Route>
        <Route path="/:topic/tests/add" element={<AddTest />}></Route>
        <Route path="/:topic/tests/edit/:id" element={<EditTest />}></Route>
        {/* prettier-ignore */}
        <Route path="/:topic/tests/details/:id" element={<DetailsTest />}></Route>
        //ADMIN - QUESTIONS
        {/* prettier-ignore */}
        <Route path="/:topic/questions/" element={<ManageQuestionsView />}></Route>
        {/* prettier-ignore */}
        <Route path="/:topic/questions/add" element={<AddQuestionView />}></Route>
        {/* prettier-ignore */}
        <Route path="/:topic/questions/edit/:id" element={<EditQuestionView />}></Route>
        //ADMIN - REPORTS
        <Route path="/:topic/reports/" element={<ReportsView />}></Route>
        {/* prettier-ignore */}
        <Route path="/:topic/reports/reports-for/:id" element={<ReportForTestView />}></Route>
        <Route path="/report-answers/:reportId" element={<AnswersView/>}></Route>
        //USER
        <Route path="choose-test/:userId" element={<ChooseTestView />}></Route>
        <Route path="take-test/:userId/:testId" element={<TakeTest />}></Route>
        {/* prettier-ignore */}
        <Route path="/finish-test/:testId/:reportId" element={<EndOfTest />}></Route>

      </Routes>
    </>
  );
};
