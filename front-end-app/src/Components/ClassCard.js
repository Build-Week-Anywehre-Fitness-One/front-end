import React from 'react';
import authAxios from "./Util/authAxios";
import axios from "axios";

export default function ClassCard({session}){

function deleteClass(){
    authAxios()
        .delete(`https://anywhere-fitness-app1.herokuapp.com/api/classes/`)
        .then((res) => {
            console.log("Deleted!", res.data)
        })
        .catch(err => console.log(err))
    }
    return(
            <div key={session.id}>
                <p>Id: {session.id}</p>
                <p>Name: {session.name}</p> 
                <p>Type: {session.type}</p>
                <p>StartTime: {session.startTime}</p>
                <p>Date: {session.date}</p>
                <p>Duration: {session.duration}</p>
                <p>Intensity: {session.intensity}</p>
                <p>Location: {session.location}</p>
                <p>MaxSize: {session.maxClassSize}</p>    
                  
                {/* <button onClick={deleteClass(session.id)}>Delete Class</button>  */}
            </div>
    )
}

