import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from 'axios';


const formSchema = yup.object().shape({
    username: yup.string().required("This is a required field."),
    password: yup.string().required("This is a required field."),
    role: yup.string().required("This is a required field."),
    auth_code: yup.string().required("This is a required field.")

    
  });


const RegInstructor = () => {

    //default state 
    const [defaultState ] = useState({
        username: "",
        password: "",
        role: "",
        auth_code: ""
        
      })

    // managing state for our form inputs
  const [instructorRegState, setInstructorRegState] = useState(defaultState);
    // State for the errors
  const [errors, setErrors] = useState(defaultState);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(()=> {
    formSchema.isValid(instructorRegState)
    .then(valid => {
      setButtonDisabled(!valid)
    })
  },[instructorRegState]);



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

       setInstructorRegState({
           ...instructorRegState,
           [e.target.name] : e.target.value
       })
        
       validateChange(e);
      
   }

    // Submit handler
    const formSubmit = e => {
    
        e.preventDefault();
      axios
      .post("https://anywhere-fitness-app1.herokuapp.com/api/register", instructorRegState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);
        // reset form if successful
        setInstructorRegState(defaultState);
      })
      .catch(err => console.log(err.response));
    };


    return (

       <div>

       
       <h1 class="headar-signin"> Sign Up</h1>
       
       <form onSubmit={formSubmit}>
       <label htmlFor="username">
           Username
           <input
           type="text"
           name="username"
           id="username"
           onChange={inputChange}
           value={instructorRegState.username}
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
           value={instructorRegState.password}
            />
            {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
       </label>

       <label htmlFor="role">
           Role
           <input 
           type="text"
           name="role"
           id="role"
           onChange={inputChange}
           value={instructorRegState.role}
           
            />
            {errors.role.length > 0 ? <p className='error'>{errors.role}</p> : null}
       </label>

       <label htmlFor="auth_code">
         Auth_code
           <input 
           type="text"
           name="auth_code"
           id="auth_code"
           onChange={inputChange}
           value={instructorRegState.auth_code}
           
            />
            {errors.auth_code.length > 0 ? <p className='error'>{errors.auth_code}</p> : null}
       </label>

       <button type="submit" disabled={buttonDisabled}>Submit</button>



       </form>
    
       

       </div>
    )
    
    
}

export default RegInstructor;