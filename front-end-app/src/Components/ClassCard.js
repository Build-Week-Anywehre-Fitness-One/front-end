import React from 'react';
import authAxios from "./Util/authAxios"

export default function ClassCard({session}){

       function deleteClass(id){
            authAxios()
                .delete(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`)
                .then(res => console.log("Deleted!", res.data))
                .catch(err => console.log(err))
    }

    return(
            <div>
                <p key={session.id}>{session.name}</p> 
                <p>{session.date}</p>
                <p>{session.intensity}</p>
                <p>{session.date}</p>
                <p>{session.date}</p>
                <p>{session.date}</p>
                <p>{session.location}</p>
                <p>{session.maxClassSize}</p>    
                  
                <button onClick={deleteClass(session.id)}>Delete Class</button> 

            </div>
    )
}