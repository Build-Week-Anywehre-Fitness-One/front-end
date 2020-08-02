import axios from 'axios'
import authAxios from "../Util/authAxios"

import {
    POSTING_CLASSES_START,
    POSTING_CLASSES_SUCCESS,
    POSTING_CLASSES_ERROR,
} from "./index"


export const submitClasses = (CL) => dispatch => {
    console.log("IT WORKED")
    dispatch({ type: POSTING_CLASSES_START })
        authAxios().post("https://anywhere-fitness-app1.herokuapp.com/api/classes", CL)
        .then(res => {
            console.log('res POST',res.data)
            dispatch({ type: POSTING_CLASSES_SUCCESS, payload: res.data })
            })
        .catch(err => {
            dispatch({ type: POSTING_CLASSES_ERROR, payload: err.response })
        })
}

// const formSubmit = e => {  
//     e.preventDefault();
//     authAxios()
//         .post("https://anywhere-fitness-app1.herokuapp.com/api/classes", classes)
//         .then(res => {
//             setCurrentClasses([...currentClasses, res.data]) //adds to Instructor state to render
//             setClasses(intitialClass); // Clears form state.
//             console.log("Successful Post!", res.data);
//             setId(res.data.id)
//             // history.push("/instructor")
//         })
//         .catch(err => console.log(err));
//         };