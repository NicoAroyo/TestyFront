import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { BackendService } from "../../../service/backendService";

export const ReportForTestView = () => {
  const { quizId } = useParams();
  const [reports, setReports] = useState();
  const { quiz, setQuiz } = useState();
  useEffect(() => {
    const service = new BackendService("reports");
    const qServce = new BackendService("quizes");
    // console.log(topic);
    try {
      // (async () => {
      //   const data = await service.getByIdAsync(quizId);
      //   const qDate = await qServce.getByIdAsync(quizId);
      //   console.log(qDate);
      //   console.log(data);
      //   // console.log(data);
      //   setQuiz(qDate);
      //   setReports(data);
      //   console.log(reports);
      // }
      // )
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
<<<<<<< HEAD
    <> 
    <div> reports </div>
    <h2>h2</h2>
    <table>
=======
    <>
      <div> {quiz.name} reports </div>
      <table>
>>>>>>> b2f2db8ffacdad5e08e11868bd8009d02595bd94
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
            {
                reports.map((report) =>  {
                    console.log(quiz);
                    console.log(reports);
                    return(
                        <tr>
                            <td>{report.user.firstName} {report.user.lastName}</td>
                            <td>{report.grade}</td>
                        </tr>

                    )
                })          
            }
     
=======
          {reports.map((report) => {
            return (
              <tr>
                <td>
                  {report.user.firstName} {report.user.lastName}
                </td>
                <td>{report.grade}</td>
              </tr>
            );
          })}
>>>>>>> b2f2db8ffacdad5e08e11868bd8009d02595bd94
        </tbody>
      </table>
    </>
  );
};
