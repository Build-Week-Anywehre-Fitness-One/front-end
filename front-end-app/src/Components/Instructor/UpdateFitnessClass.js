import React,{ useState, useEffect } from 'react';
// import axios from "axios";
import * as yup from 'yup';
import './NewClassForm.css';

export default function UpdateFitnessClass({putClass}){

    const formSchema = yup.object().shape({
        startTime: yup.string().required("This is a required field."),
        date: yup.string(),
        duration: yup.string().required("This is a required field."),
        intensity: yup.string().required("This is a required field."),
        location: yup.string().required("This is a required field."),
        maxClassSize: yup.string().required("Must include email address.")
        
      });

      //Default state
    const [intitialClass] = useState({
        startTime: "",
        date: "",
        duration: "",
        intensity: "",
        location: "",
        maxClassSize: "",
    })

    //Form state handled here
    const [newClass, setNewClass] = useState(intitialClass);
    //errors state
    const [errors, setErrors] = useState(intitialClass);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(newClass)
        .then(valid => {
            setButtonDisabled(!valid)
        })
    }, [newClass]);

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
        e.preventDefault();
        setNewClass({
            ...newClass,
                [e.target.name]: e.target.value 
            })
            changeValidation(e);
    };

    //Update this function
    const putClassFunc = e => {  
        e.preventDefault();
        putClass(2, newClass)
    }
        
    return(
        <form className="form" onSubmit={putClassFunc}>

            <label htmlFor="startTime">StartTime</label>
            <input 
                type="time"
                placeholder="startTime"
                name="startTime"
                onChange={handleChange}
                value={newClass.startTime}
                    />
            {errors.startTime.length > 0 ? <p className='error'>{errors.username}</p> : null}


            <label htmlFor="date">Date</label>
            <input 
                type="date"
                placeholder="date"
                name="date"
                onChange={handleChange}
                value={newClass.date}
                    />
            {errors.date.length > 0 ? <p className='error'>{errors.username}</p> : null}

            <label htmlFor="duration">Duration</label>
            <input 
                type="number"
                name="duration"
                onChange={handleChange}
                value={newClass.duration}
                />
            {errors.duration.length > 0 ? <p className='error'>{errors.username}</p> : null}


            <label htmlFor="intensity">Intensity</label>
            <input 
                type="text"
                placeholder="intensity"
                name="intensity"
                onChange={handleChange}
                value={newClass.intensity}
                />
            {errors.intensity.length > 0 ? <p className='error'>{errors.username}</p> : null}


            <label htmlFor="location">Location</label>
            <input 
                type="text"
                placeholder="location"
                name="location"
                onChange={handleChange}
                value={newClass.location}
                    />
            {errors.location.length > 0 ? <p className='error'>{errors.username}</p> : null}

            <label htmlFor="maxClassSize">Max Class Size</label>
            <input 
                type="number"
                placeholder="maxClassSize"
                name="maxClassSize"
                onChange={handleChange}
                value={newClass.maxClassSize}
                    />
            {errors.maxClassSize.length > 0 ? <p className='error'>{errors.username}</p> : null}

            <button type="submit">Put Class</button>
        </form>
    )
}
