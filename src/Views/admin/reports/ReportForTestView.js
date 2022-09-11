import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { BackendService } from "../../../service/backendService";
import { Header } from "../../../components/Header/Header";
import { Table } from "../../../components/Table/Table";
import { Button, SmallButton } from "../../../components/Button/Button";
import "../../../sass/ReportsForTest.scss";
import { formatDateTime } from "../../../utils/core";
import { Pagination } from "../../../components/Pagination/Pagination";

let PageSize = 8;

export const ReportForTestView = () => {
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return reports.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, reports]);

  useEffect(() => {
    (async () => {
      const reportsService = new BackendService("reports");
      const quizService = new BackendService("quizes");

      const reportsData = await reportsService.getAllAsync();
      const quizData = await quizService.getByIdAsync(id);
      console.log("QUIZ", quizData);
      console.log("REPORTS", reportsData);
      setQuiz(quizData);
      setReports(reportsData.filter((r) => r.quizId === id));

      // setReports(reportsData);
    })();
  }, []);

  return (
    <main className="reports-for-test">
      <Header> reports for: "{quiz?.name}" </Header>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Passed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTableData?.map((report) => {
            return (
              <tr>
                <td>
                  {report.student.firstName} {report?.student.lastName}
                </td>
                <td>{formatDateTime(report.date)}</td>
                <td
                  style={{
                    color: report.grade > quiz.passingGrade ? "green" : "red",
                  }}
                >
                  {report.grade}
                </td>
                <td
                  style={{
                    color: report.grade > quiz.passingGrade ? "green" : "red",
                  }}
                >
                  {report.grade > quiz.passingGrade ? "Yes" : "No"}
                </td>
                <td>
                  <SmallButton onClick={() => navigate(`/report-answers/${report._id}`)}>View Answers</SmallButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalCount={reports.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      ></Pagination>
      <Button onClick={() => navigate(-1)}> Back </Button>
    </main>
  );
};
