import authAxios from "../Util/authAxios";

import {
    DELETING_CLASSES_START,
    DELETING_CLASSES_SUCCESS,
    DELETING_CLASSES_ERROR,
} from "./index"
import { readClasses } from "./readClasses";

export const deleteClasses = (id) => dispatch => {
    console.log("Delete Classes WORKED")
    dispatch({ type: DELETING_CLASSES_START })
        authAxios()
        .get(`https://anywhere-fitness-app1.herokuapp.com/api/users/1/classes/${id}`)
        .then(res => {
            dispatch({ type: DELETING_CLASSES_SUCCESS, payload: res.data })
            console.log('res DELETE',res.data)
            readClasses()
            })
        .catch(err => {
            dispatch({ type: DELETING_CLASSES_ERROR, payload: err.response })
        })
}