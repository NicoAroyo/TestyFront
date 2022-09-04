// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// import { BackendService } from "../../../service/backendService";

// export const ReportForTestView = () => {
//   const { quizId } = useParams();
//   const [reports, setReports] = useState();
//   const { quiz, setQuiz } = useState();
//   useEffect(() => {
//     const service = new BackendService("reports");
//     const qServce = new BackendService("quizes");
//     // console.log(topic);
//     try {
//       // (async () => {
//       //   const data = await service.getByIdAsync(quizId);
//       //   const qDate = await qServce.getByIdAsync(quizId);
//       //   console.log(qDate);
//       //   console.log(data);
//       //   // console.log(data);
//       //   setQuiz(qDate);
//       //   setReports(data);
//       //   console.log(reports);
//       // }
//       // )
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   return (
//     <>
//     <div> reports </div>
//     <h2>h2</h2>
//     <table>

//       <div> {quiz.name} reports </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Grade</th>
//           </tr>
//         </thead>
//         <tbody>
//             {
//                 reports.map((report) =>  {
//                     console.log(quiz);
//                     console.log(reports);
//                     return(
//                         <tr>
//                             <td>{report.user.firstName} {report.user.lastName}</td>
//                             <td>{report.grade}</td>
//                         </tr>

//                     )
//                 })
//             }
//           {reports.map((report) => {
//             return (
//               <tr>
//                 <td>
//                   {report.user.firstName} {report.user.lastName}
//                 </td>
//                 <td>{report.grade}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );

// };
