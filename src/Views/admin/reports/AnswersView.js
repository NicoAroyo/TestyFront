import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BackendService } from '../../../service/backendService'
import { Header } from '../../../components/Header/Header'
import { Table } from '../../../components/Table/Table'
import { Label } from '../../../components/Label/Label'
import { Input } from '../../../components/Input/Input'

export const AnswersView = () => {
    const { reportId} = useParams();
    const [report, setReport] = useState();
    const navigate = useNavigate(); 

    useEffect(() => {
        (async () => {
            console.log(reportId);
          const reportsService = new BackendService("reports");
          const report =  await reportsService.getByIdAsync(reportId);
          console.log(report);
          setReport(report);
        })();
      }, []);
    

  return (
    <>
    <Header>{report?.student.firstName} {report?.student.lastName} answers:</Header>
    {
        report?.questions.map((q) => {
            return(
                <>
                <Label>{q.content}</Label>
                <Table>
                    <thead>
                        <tr>
                            <th>Correct</th>
                            <th>Checked</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {q?.answers.map((a) => {
                            return(
                                
                                <tr>    
                                    <td> <Input type="radio" checked = {a.isCorrect} disabled = {true }></Input> </td>
                                    <td> <Input type="radio" checked = {a.checked} disabled = {true }></Input> </td>
                                    {/* <td>{a.isCorrect ? "Yes" : "No"}</td>
                                    <td>{a.che ? "Yes" : "No"}</td> */}
                                    <td>{a.content}</td>
                                </tr>
                                
                            )
                        })}

                    </tbody>
                </Table>
                </>
            )
        })
    }
    {/* <Table>
        <thead>
            <tr>
            <th>Question</th>
            <th>Answer</th>
            </tr>
        </thead>
        <tbody>
            {
                report?.questions.map((q) => {
                    return(
                        <>
                        <tr>
                        <td>{q.content}</td>
                        <td>Answers :
                         <ul>
                            {q?.answers.map((a) => {
                                return(
                                    <>
                                    {a.isChecked ? <li>{a.content}</li> : <></>}
                                    </>                                         
                                )
                            })}
                        </ul> 
                        </td>
                        </tr>

                        </>
                    );
                })
            }
        </tbody>
    </Table> */}
    </>
   
  )
};
