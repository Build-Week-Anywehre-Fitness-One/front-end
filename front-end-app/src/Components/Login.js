import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    username: yup.string().required("This is a required field."),
    password: yup.string().required("This is a required field.")

  });

const Login = (props) => {
    //default state 
    const [defaultState] = useState({
        username: "",
        password: ""  
      })
    // managing state for our form inputs
  const [loginState, setLoginState] = useState(defaultState);
    // State for the errors
  const [errors, setErrors] = useState(defaultState);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(()=> {
    formSchema.isValid(loginState)
    .then(valid => {
      setButtonDisabled(!valid);
    })
  },[loginState]);

const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

   const inputChange = e => {
    //    console.log(e.target.value)
       e.persist();

       setLoginState({
           ...loginState,
           [e.target.name] : e.target.value
       })     
       validateChange(e); 
   }

    // Submit handler
    const formSubmit = e => {
    
      e.preventDefault();
      axios
      .post("https://anywhere-fitness-app1.herokuapp.com/api/login", loginState)
      .then(res => {
        console.log("payload", res.data);
        localStorage.setItem("token", res.data.token);
        //redirect the user to the app's main logged in page
        props.history.push("/instructor") //protected route path goes here.
      })
      .catch(err => console.log(err.response));
    };

    return (
       <div>
          <h1>User Login</h1>
          
          <form onSubmit={formSubmit}>
          <label htmlFor="username">
              Username
              <input
              type="text"
              name="username"
              id="username"
              onChange={inputChange}
              value={loginState.username}
                />
                {errors.username.length > 0 ? <p className='error'>{errors.username}</p> : null}
          </label>

          <label htmlFor="password">
              Password
              <input 
              type="password"
              name="password"
              id="password"
              onChange={inputChange}
              value={loginState.password}
                />
                {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
          </label>

          <button type="submit" disabled={buttonDisabled}>Submit</button>
          </form>
    
       </div>
    )
}

export default Login;