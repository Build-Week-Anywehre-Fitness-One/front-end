import React from 'react';
import authAxios from "./Util/authAxios";
import {connect} from 'react-redux';
import { Button } from '@material-ui/core';
import {Card} from '@material-ui/core';
import { CardContent } from '@material-ui/core';


import axios from "axios";
import {deleteClasses} from './actions/deleteClasses'

function ClassCard({state, deleteClasses, session}){
    console.log("ClassCard", state)

    function deleteClass(){
        authAxios()
            .delete(`https://anywhere-fitness-app1.herokuapp.com/api/classes/`)
            .then((res) => {
                console.log("Deleted!", res.data)
                // const newClasses = currentClasses.filter((classes) => classes.id !== id);
                //     setRecipes(newRecipes);
                    // history.push("/ins")
            })
            .catch(err => console.log(err))
        }
    return(
            <div className="card-content" key={session.id}>
                <p>Id: {session.id}</p>
                <p>Name: {session.name}</p> 
                <p>Type: {session.type}</p>
                <p>StartTime: {session.startTime}</p>
                <p>Date: {session.date}</p>
                <p>Duration: {session.duration}</p>
                <p>Intensity: {session.intensity}</p>
                <p>Location: {session.location}</p>
                <p>MaxSize: {session.maxClassSize}</p>    
                  
                <Button variant="contained" color="secondary" onClick={deleteClass(session.id)}>Delete Class</Button> 
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(
        mapStateToProps, {deleteClasses})(ClassCard)