
import React, { useEffect, useState } from "react";

export const AddQuestionView = () => {

    const [answers, setAnswers] = useState([{id : 1, content: "", isCorrect : false}]);
  return (
    <>
    <h3>AddQuestionView</h3>
    <form> 
        <div>
        <label>Question content:</label>
        <input type="text"></input>
        </div>
        <div>
        <label>Question type:</label>
        <div>
            <input type="radio" value ="singleChoice" name="questionType"/> Single choice
            <input type="radio" value="multChoice" name="questionType"/> Multiple choices
            </div>
        </div>
        <div>
            <label>Display</label>
            <div>
            <input type="radio" value ="Vertical" name="display"/> Vertical 
            <input type="radio" value="Horizontal" name="display"/> Horizontal 
            </div>
        </div>
        <div>
            <label>Answers</label>
            <button onClick={(e) => {
                e.preventDefault();
                const newAnswer = {id :answers[answers.length-1].id+1, content: "", correct :false};
                setAnswers([...answers,newAnswer]);
                console.log(answers);
                }}>Add answer</button>
            <div>
            {answers.map((answer) => {
            return (
                <>
              <input type="radio" name="correct" value={answer.isCorrect}>
              </input>
                <input type="text" value={answer.content}></input>
                <button onClick={(e) => 
                    {
                        e.preventDefault();
                        setAnswers(answers.filter(a => a.id != answer.id))}}>Delete</button>
                </>
            );
          })}
          

               </div>
        </div>
    </form>
    </>
    
  )
}
