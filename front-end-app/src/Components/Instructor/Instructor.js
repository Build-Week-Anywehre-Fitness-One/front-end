import React,{useState, useEffect} from 'react';
import axios from 'axios';
import UpdateFitnessClass from './UpdateFitnessClass';
import NewClassForm from './NewClassForm';
import authAxios from "../Util/authAxios";
import ClassCard from "../../Components/ClassCard";
import {Route, Link} from "react-router-dom";


export default function Instructor(){


    const [currentClasses, setCurrentClasses] = useState([])

    function putClass(id, updatedClass){
        axios.put(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`, updatedClass)
              .then(res => console.log(res))
              .catch(err => console.log(err));
              // push the user back to the classes
      };

      useEffect(() => {
          authAxios()
          .get("https://anywhere-fitness-app1.herokuapp.com/api/users/1/classes/")
            .then(res => {
                console.log("Hey There", res.data)
                setCurrentClasses(res.data)
            })
            .catch(err => console.log(err))
      },[])
   
    
    return(
        <>
        {currentClasses.map(session => {return <ClassCard key={session.id} session={session} />})}

           <Route exact path="/add-new-class" render={() => <NewClassForm setCurrentClasses={setCurrentClasses} /> }/>
             
            <UpdateFitnessClass  putClass={putClass} />
        </>
    )

}