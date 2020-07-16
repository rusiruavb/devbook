import React, { useState } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await axios.post(
        "http://localhost:8056/user/login",
        loginUser
      );
      const setUserData = {
        token: loginResponse.data.token,
        user: loginResponse.data.user,
        err: loginResponse.data.error,
      };
      localStorage.setItem("Authorization", setUserData.token);
      window.location = "/me";
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="pt-5">
      <h1>Login to System</h1>
      {error && (
        <div className="pt-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}
      <form className="pt-3" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button variant="contained" type='submit' color='primary' style={{ width: 150 + 'px' }}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
