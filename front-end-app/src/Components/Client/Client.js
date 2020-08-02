import React,{useEffect, useState} from 'react';
import authAxios from "../Util/authAxios";
import { ClientRoute } from '../PrivateRoute/ClientRoute';
import * as yup from 'yup';
import ClassCard from "../../Components/ClassCard";


export default function Client(){

    const formSchema = yup.object().shape({
        id: yup.string().required("This is a required field.")
    })

    const[initialID] = useState({
        id: ""
    })

    const [joinedClasses, setJoinedClasses] = useState([])
    const [classes, setClasses] = useState(initialID)
    const [errors, setErrors] = useState(initialID)

    const [buttonDisabled,setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(joinedClasses)
        .then(valid => {
            setButtonDisabled(!valid)
        })
    }, [joinedClasses]);

    const changeValidation = e => {
        yup
        .reach(formSchema, e.target.classID)
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

    const handleChange = (e) => {
        e.persist();
        setClasses({
            ...classes,
             [e.target.name]: e.target.value 
            })

        changeValidation(e);
    };
    

    const formSubmit = (e) => {
        e.preventDefault();
        authAxios()
        .get(`https://anywhere-fitness-app1.herokuapp.com/api/users/1/classes/${classes.id}`)
        .then(res => {
            console.log("Client Data", res.data)
            setJoinedClasses([...joinedClasses, res.data])
        })
        .catch(err => console.log(err))
        
    }
    // useEffect(() => {
    //     authAxios()
    //         .get("https://anywhere-fitness-app1.herokuapp.com/api/users/1/classes/")
    //         .then(res => {
    //             console.log("Client Data", res.data)
    //             setJoinedClasses(res.data)
    //         })
    //         .catch(err => console.log(err))
    // },[classes])

    return(
        <div>
            <div>Client Logged In </div>

            <form onSubmit={formSubmit}>
                <label htmlFor="ClassID">Class ID:</label>
                    <input 
                        type="text"
                        placeholder="Class ID"
                        name="id"
                        onChange={handleChange}
                        value={classes.id}
                        />

                    <button>Submit</button>
            </form>

        {joinedClasses.map((joined, index) => {
                return(
                    <>
                    <ClassCard key={index} joined={joined} />
                    </>
                )
        })}
        </div>
    )
}