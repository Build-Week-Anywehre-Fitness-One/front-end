import React from 'react';
import axios from 'axios';
import UpdateFitnessClass from './UpdateFitnessClass';
import NewClassForm from './NewClassForm';

export default function Instructor(){
    function putClass(id, updatedClass){

        axios.put(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`, updatedClass)
              .then(res => console.log(res))
              .catch(err => console.log(err));
    
              // push the user back to the classes
      };

    function deleteClass(id){
        axios.delete(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`)
    }
    
    return(
        <>
             <NewClassForm deleteClass={deleteClass} />
             
             <UpdateFitnessClass  putClass={putClass} />

             <button onClick={deleteClass()}>Delete Class(Not hooked up)</button>
        </>
        
    )

}