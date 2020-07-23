import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    userName: yup.string().required("This is a required field."),
    password: yup.string().required("This is a required field."),
    confirmPassword: yup.string().required("This is a required field."),
    terms: yup.boolean().oneOf([true], "please agree to terms of use")
    
    
  });


const ClientLogin = () => {

    //default state 
    const [defaultState] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
        terms: false
        
      })

    // managing state for our form inputs
  const [clientAccState, setClientAccState] = useState(defaultState);
    // State for the errors
  const [errors, setErrors] = useState(defaultState);

//   console.log(errors)

// new state to set our post request too. So we can console.log and see it.
const [post, setPost] = useState([]);

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

       const newAccData = {
        ...clientAccState,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value
      };
  
      validateChange(e);
      setClientAccState(newAccData);
    };
      
   

    // Submit handler
    const formSubmit = e => {
    
        e.preventDefault();
     axios
      .post("https://reqres.in/api/users", clientAccState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);
        // reset form if successful
        setClientAccState(defaultState);
      })
      .catch(err => console.log(err.response));
    };


    return (

       <div>

       <h1>Account Information</h1>
       
       <form onSubmit={formSubmit}>
       <label htmlFor="userName">
           User Name
           <input
           type="text"
           name="userName"
           id="userName"
           onChange={inputChange}
           value={clientAccState.userName}
            />
            {errors.userName.length > 0 ? <p className='error'>{errors.userName}</p> : null}
       </label>

       <label htmlFor="password">
           password
           <input 
           type="password"
           name="password"
           id="password"
           onChange={inputChange}
           value={clientAccState.password}

            />
            {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
       </label>

       <label htmlFor="confirmPassword">
           Confirm Password
           <input 
           type="password"
           name="confirmPassword"
           id="confirmPassword"
           onChange={inputChange}
           value={clientAccState.confirmPassword}
           
            />
            {errors.confirmPassword.length > 0 ? <p className='error'>{errors.confirmPassword}</p> : null}
       </label>
       
       <label htmlFor="terms">
           Terms & Conditions
           <input 
           type="checkbox"
           name="terms"
           id="terms"
           onChange={inputChange}
           checked={clientAccState.terms}
            />
        
       </label>

       
       <button type="submit">Submit</button>



       </form>


       </div>

    )
    
}

export default ClientLogin;