import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { QuizService } from '../../service/quizService';
import { QuestionsService } from '../../service/questionsService';
export const TakeTestView = () => {
    const {testId}= useParams();
    const {test , setTest } = useState();
    const navigate = useNavigate();
    const service = new QuizService();
    const qService = new QuestionsService();
    const [questions, setQuestions] = useState([]);
    

    useEffect(() => {
      const service = new QuizService();
      const qService = new QuestionsService();
      (async () => {  
        const data = await service.getByIdAsync(testId);
        console.log(data);
        const questions = [];       
        data.questions?.forEach(async q => {
          const question =await qService.getByIdAsync(q);
          questions.push(question);
        }
        );
        console.log(questions);
         setQuestions(questions);
        // setQuestions(questions);
        //console.log(setQuestions);
        
        console.log(questions);
      })();
    }, []);

  return (
    <>
      <h1>
        {testId}
    </h1>
    {/* <div>
      <h1>bob</h1>
    </div> */}
    <div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>hi</th>
            <th>bye</th>
          </tr>
          </thead> 
        <tbody>
        {questions.map((question) => {
          return (
            <>
            <tr key={question.id}>
                <td>{question.content}</td>
                <td>
                  {question.type}
                  {/* {question.answers.map((option) => {
                    return(
                      <input type= {question.type === "singleChoice"? "radio" : "checkbox"}>{option}</input>
                      )                                    
                    })} */}
                </td>
              </tr>
                    </>
            );
          })}
        </tbody>
      </table>
          </div>

    
    <button onClick={() => navigate(-1)}>Back</button>
    </>
  
  )
}
