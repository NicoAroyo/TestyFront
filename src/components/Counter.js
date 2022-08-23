import React, { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count < 1) return;
    setCount(count - 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>increase count</button>
      <button onClick={decreaseCount}>decrease count</button>
    </div>
  );
};
