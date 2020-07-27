import React,{ useState,useEffect } from 'react';
import axios from "axios";
import * as yup from 'yup';
import './NewClassForm.css';


export default function NewClassForm({deleteClass}) {

    const formSchema = yup.object().shape({

        name: yup.string().required("This is a required field."),
        type: yup.string().required("This is a required field."),
        startTime: yup.string().required("This is a required field."),
        date: yup.string(),
        duration: yup.string().required("This is a required field."),
        intensity: yup.string().required("This is a required field."),
        location: yup.string().required("This is a required field."),
        maxClassSize: yup.string().required("Must include email address.")
        
      });
     
    //Default state
    const [intitialClass] = useState({
        name: "",
        type: "",
        startTime: "",
        date: "",
        duration: "",
        intensity: "",
        location: "",
        maxClassSize: "",
    })

    //Form state handled here
    const [classes, setClasses] = useState(intitialClass);

    //error state
    const [errors, setErrors] = useState(intitialClass);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(classes)
        .then(valid => {
            setButtonDisabled(!valid)
        })
    }, [classes]);

    const changeValidation = e => {

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
    }

    const handleChange = e => {
        
        e.persist();
        setClasses({
            ...classes,
             [e.target.name]: e.target.value 
            })

        changeValidation(e);
    };

    const formSubmit = e => {  
        e.preventDefault();
        axios
            .post("https://anywhere-fitness-app1.herokuapp.com/api/classes", classes)
            .then(res => {
                setClasses(res.data); // get just the form data from the REST api
                console.log("successful", res.data);
                // reset form if successful
                setClasses(intitialClass);
            })
            .catch(err => console.log(err.response));
            };

    return (
        <div className="container">
      
        <form onSubmit={formSubmit} className="NewClassForm">

                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    placeholder="name"
                    name="name"
                    onChange={handleChange}
                    value={classes.name}
                     />
                {errors.name.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <label htmlFor="type">Type</label>
                <input 
                    type="text"
                    placeholder="type"
                    name="type"
                    onChange={handleChange}
                    value={classes.type}
                     />
                {errors.type.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <label htmlFor="startTime">StartTime</label>
                <input 
                    type="time"
                    placeholder="startTime"
                    name="startTime"
                    onChange={handleChange}
                    value={classes.startTime}
                     />
                {errors.startTime.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <label htmlFor="date">Date</label>
                <input 
                    type="date"
                    placeholder="date"
                    name="date"
                    onChange={handleChange}
                    value={classes.date}
                     />
                {errors.date.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <label htmlFor="duration">Duration</label>
                <input 
                    type="number"
                    name="duration"
                    onChange={handleChange}
                    value={classes.duration}
                     />
                {errors.duration.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <label htmlFor="intensity">Intensity</label>
                <input 
                    type="text"
                    placeholder="intensity"
                    name="intensity"
                    onChange={handleChange}
                    value={classes.intensity}
                     />
                {errors.intensity.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <label htmlFor="location">Location</label>
                <input 
                    type="text"
                    placeholder="location"
                    name="location"
                    onChange={handleChange}
                    value={classes.location}
                     />
                {errors.location.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <label htmlFor="maxClassSize">Max Class Size</label>
                <input 
                    type="number"
                    placeholder="maxClassSize"
                    name="maxClassSize"
                    onChange={handleChange}
                    value={classes.maxClassSize}
                     />
                {errors.maxClassSize.length > 0 ? <p className='error'>{errors.username}</p> : null}

                <button type="submit" disabled={buttonDisabled}>Submit</button>
        </form>
    
    {/* Add a button that onClick deletes the class based on its id(Which wll be a parameter in the APi call endpoint) */}
    </div>

    )
}