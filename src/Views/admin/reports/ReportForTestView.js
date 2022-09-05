import React from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { BackendService } from '../../../service/backendService'

export const ReportForTestView = () => {

    const {topic ,  id}= useParams();
    const [reports,setReports] = useState([]);
    const [quiz,setQuiz] = useState();

    useEffect(() => {
        
        (async ()=>{

            console.log("hi");
            console.log(id);
        const service = new BackendService("reports");
        const qServce = new BackendService("quizes");
        console.log(topic);
        console.log("Beeeeee");

        const data = await service.getAllAsync(); 
        const qData = await qServce.getByIdAsync(id);
        console.log("QUIZ",qData);
        console.log("REPORTS",data);
        setQuiz(qData);
        setReports(data.filter(r => r.quizId != id));
        //setReports(data);
    })();
    }, []);

  return (
    <> 
    <div> reports for : {quiz?.name}</div>
    
    <table>
        <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Grade
                </th>
                <th>
                    Passed
                </th>
            </tr>
        </thead>
        <tbody>
            {
                reports?.map((report) =>  {
                    return(
                        <>
                        <tr>
                           <td> {report.student.firstName} {report?.student.firstName} </td>
                            <td>{report.grade}</td>
                           <td>{report.grade > quiz.passingGrade ? <>Yes</> : <>No</>}</td>
                             
                        </tr>
                        </>
                    )
                })          
            }
     
        </tbody>
    </table>
    </>
  )
}
