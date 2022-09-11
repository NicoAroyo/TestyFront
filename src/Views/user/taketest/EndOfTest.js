import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { useEffect } from "react";
import { useState } from "react";
import { Header } from "../../../components/Header/Header";
import { SmallButton } from "../../../components/Button/Button";
export const EndOfTest = () => {
  const navigate = useNavigate();
  const { testId, reportId } = useParams();
  const [test, setTest] = useState();
  const [report, setReport] = useState();

  useEffect(() => {
    const quizService = new BackendService("quizes");
    const reportService = new BackendService("reports");
    (async () => {
      try {
        const qdata = await quizService.getByIdAsync(testId);
        const rdata = await reportService.getByIdAsync(reportId);
        setTest(qdata);
        setReport(rdata);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div style={{ margin: "20px 40px" }}>
      <Header>
        {report?.grade > test?.passingGrade ? test?.passText : test?.failText}
      </Header>
      <Header>{report?.grade}</Header>
      <SmallButton onClick={() => navigate("/")}>Ok</SmallButton>
    </div>
  );
};
