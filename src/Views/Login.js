import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthenticationService } from "../service/authenticationService";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const authenticate = async (e) => {
    e.preventDefault();
    const auth = new AuthenticationService();
    try {
      const { user } = await auth.loginUser({ email, password });
      console.log(user); 
      if (user) navigate(`/admin`);
      if (!user) alert("Invalid Credentials");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1>Login Screen x)</h1>
      <form onSubmit={authenticate}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button onClick={authenticate}>login</button>
          <button onClick={navigateBack}>Back</button>
        </div>
      </form>
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
