import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../useForm";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

const LOGIN_USER = gql`
mutation LoginUser($loginInput: LoginInput) {
  loginUser(loginInput: $loginInput) {
    email
    password
    token
  }
}
`;

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  function loginUserCallback() {
    console.log("login callback");
    loginUser();
  }
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });
  
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      console.log("update calll")
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <div className="">
      <hr />
      <div className="login">
        <div className="lContainer">
          <h2>LOGIN HERE</h2>
          <h6>Enter Email </h6>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            name="email"
            onChange={onChange}
            className="inputFields"
            required
          />

          <h6>Enter Password </h6>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            onChange={onChange}
            className="inputFields"
          />
          <button onClick={onSubmit} className="lButton">
            Login
          </button>
          <div className="error-message">
            {errors?.map(function (error) {
              return <div className="error-message">{error.message}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
