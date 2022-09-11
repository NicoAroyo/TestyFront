import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../service/authenticationService";
import "../../sass/Login.scss";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = async (e) => {
    e.preventDefault();
    const auth = new AuthenticationService();
    try {
      const { user } = await auth.loginUser({ email, password });

      if (user?.isAdmin) {
        navigate(`/admin/${user._id}`);
      } else if (!user?.isAdmin) {
        navigate(`/choose-test/${user._id}`);
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials");
    }
  };

  const signUp = () => {
    navigate("sign-up");
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Login to your account</h2>

        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={authenticate}>Login</button>
          <button onClick={signUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};
