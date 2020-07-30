import React,{ useState,useEffect } from 'react';
import authAxios from "../Util/authAxios";
import {deleteClass} from '../Instructor/Instructor';
import * as yup from 'yup';
import './NewClassForm.css';


export default function NewClassForm({deleteClass, setCurrentClasses}) {

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

    //   function deleteClass(id){
    //     axios.delete(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`)
    //         .then(res => console.log("Deleted!", res.data))
    //         .catch(err => console.log(err))
    // }
     
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
    const [idD, setId] = useState("");
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
        authAxios()
            .post("https://anywhere-fitness-app1.herokuapp.com/api/classes", classes)
            .then(res => {
                setCurrentClasses(res.data)
                setClasses(intitialClass); // Clears form state.
                console.log("Successful Post!", res.data);
                setId(res.data.id)
            })
            .catch(err => console.log(err));
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
    
        {/* <button onClick={deleteClass(idD)}>Delete Class(Not hooked up)</button> */}

    </div>

    )
}