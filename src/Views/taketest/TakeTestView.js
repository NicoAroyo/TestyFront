import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const TakeTestView = () => {
    const {testId}= useParams();
    const navigate = useNavigate();
  return (
    <>
      <h1>
        {testId}
    </h1>
    <button onClick={() => navigate(-1)}>Back</button>
    </>
  
  )
}
