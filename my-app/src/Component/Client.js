import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    firstName: yup.string().required("This is a required field."),
    lastName: yup.string().required("This is a required field."),
    streetAdd1: yup.string().required("This is a required field."),
    streetAdd2: yup.string(),
    city: yup.string().required("This is a required field."),
    state: yup.string().required("This is a required field."),
    zipCode: yup.string().required("This is a required field."),
    phone: yup.string().required("This is a required field."),
    email: yup
      .string()
      .email("Must be a valid email address.")
      .required("Must include email address.")
    
  });


const Client = () => {

    //default state 
    const [defaultState ] = useState({
        firstName: "",
        lastName: "",
        streetAdd1: "",
        streetAdd2: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        email: ""
      })

    // managing state for our form inputs
  const [clientRegState, setClientRegState] = useState(defaultState);
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

       setClientRegState({
           ...clientRegState,
           [e.target.name] : e.target.value
       })
        
       validateChange(e);
      
   }

    // Submit handler
    const formSubmit = e => {
    
        e.preventDefault();
        axios
      .post("https://reqres.in/api/users", clientRegState)
      .then(res => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);
        // reset form if successful
        setClientRegState(defaultState);
      })
      .catch(err => console.log(err.response));
    };


    return (

       <div>

       <h1>Client Registration</h1>
       <h2>Personal Information</h2>
       
       <form onSubmit={formSubmit}>
       <label htmlFor="firstName">
           First Name
           <input
           type="text"
           name="firstName"
           id="firstName"
           onChange={inputChange}
           value={clientRegState.firstName}
            />
            {errors.firstName.length > 0 ? <p className='error'>{errors.firstName}</p> : null}
       </label>

       <label htmlFor="lastName">
           Last Name
           <input 
           type="text"
           name="lastName"
           id="lastName"
           onChange={inputChange}
           value={clientRegState.lastName}
            />
            {errors.lastName.length > 0 ? <p className='error'>{errors.lastName}</p> : null}
       </label>

       <label htmlFor="streetAdd1">
           Street Address 1
           <input 
           type="text"
           name="streetAdd1"
           id="streetAdd1"
           onChange={inputChange}
           value={clientRegState.streetAdd1}
           
            />
            {errors.streetAdd1.length > 0 ? <p className='error'>{errors.streetAdd1}</p> : null}
       </label>
       
       <label htmlFor="streetAdd2">
           Street Address 2
           <input 
           type="text"
           name="streetAdd2"
           id="streetAdd2"
           onChange={inputChange}
           value={clientRegState.streetAdd2}
            />
            {errors.streetAdd2.length > 0 ? <p className='error'>{errors.streetAdd2}</p> : null}
       </label>

       <label htmlFor="city">
           City
           <input 
           type="city"
           name="city"
           id="city"
           onChange={inputChange}
           value={clientRegState.city}
            />
            {errors.city.length > 0 ? <p className='error'>{errors.city}</p> : null}
       </label>

       <label htmlFor="state">
           State
           <input 
           type="state"
           name="state"
           id="state"
           onChange={inputChange}
           value={clientRegState.city}
            />
            {errors.state.length > 0 ? <p className='error'>{errors.state}</p> : null}
       </label>

       <label htmlFor="zipCode">
           Zip Code
           <input 
           type="zipCode"
           name="zipCode"
           id="zipCode"
           onChange={inputChange}
           value={clientRegState.zipCode}
            />
            {errors.zipCode.length > 0 ? <p className='error'>{errors.zipCode}</p> : null}
       </label>

       <label htmlFor="phone">
           Phone
           <input 
           type="phone"
           name="phone"
           id="phone"
           onChange={inputChange}
           value={clientRegState.phone}
            />
            {errors.phone.length > 0 ? <p className='error'>{errors.phone}</p> : null}
       </label>

       <label htmlFor="email">
           Email
           <input 
           type="email"
           name="email"
           id="email"
           onChange={inputChange}
           value={clientRegState.email}
            />
            {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null}
       </label>

       <button type="submit">Submit</button>



       </form>


       </div>
    )
    
}

export default Client;