import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../useForm";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
    }
  }
`;
const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("register callback");
    registerUser();
  }
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
      console.log(errors);
    },
    variables: { registerInput: values },
  });

  return (
    <div className="registerFromContainer">
      <form>
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label>
          <b>UserName</b>
        </label>
        <input
          className="inputFields"
          type="text"
          onChange={onChange}
          placeholder="Enter Your Name"
          name="username"
          id="username"
        />
        <br />

        <label>
          <b>Email</b>
        </label>
        <input
          className="inputFields"
          type="email"
          onChange={onChange}
          placeholder="Enter Your E-mail"
          name="email"
          id="email"
        />
        <br />

        <label>
          <b>Set Password</b>
        </label>
        <input
          className="inputFields"
          type="password"
          onChange={onChange}
          placeholder="Enter Your Password"
          name="password"
          id="password"
        />
        <br />

        <p>
          By creating an account you agree to our <a href="">Terms & Privacy</a>
          .
        </p>

        <button type="submit" className="registerbutton" onClick={onSubmit}>
          Register
        </button>
        {errors?.map(function (error) {
          return <div className="error-message">{error.message}</div>;
        })}
      </form>
    </div>
  );
};

export default Register;
