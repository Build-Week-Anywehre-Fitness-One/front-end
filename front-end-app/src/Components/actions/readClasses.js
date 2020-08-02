import axios from 'axios'
import authAxios from "../Util/authAxios"

import {
    FETCHING_CLASSES_START,
    FETCHING_CLASSES_SUCCESS,
    FETCHING_CLASSES_ERROR,
} from "./index"


export const readClasses = () => dispatch => {
    console.log("Read Classes WORKED")
    dispatch({ type: FETCHING_CLASSES_START })
        authAxios()
        .get("https://anywhere-fitness-app1.herokuapp.com/api/users/1/classes/")
        .then(res => {
            dispatch({ type: FETCHING_CLASSES_SUCCESS, payload: res.data })
            console.log('res GET',res.data)
            })
        .catch(err => {
            dispatch({ type: FETCHING_CLASSES_ERROR, payload: err.response })
        })
}