import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {readClasses} from '../actions/readClasses';

import UpdateFitnessClass from './UpdateFitnessClass';
import NewClassForm from './NewClassForm';
import authAxios from "../Util/authAxios";
import ClassCard from "../../Components/ClassCard";
import {Route, Link} from "react-router-dom";


function Instructor({putClass, currentClasses, readClasses}){
    console.log("FROM REDUX", currentClasses)

    // const [currentClasses, setCurrentClasses] = useState([])

    function putClass(id, updatedClass){
        authAxios()
              .put(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`, updatedClass)
              .then(res => {
                  console.log("RES PUT", res)
                  readClasses()
                })
              .catch(err => console.log(err));
              // push the user back to the classes
      };

//       onst newRecipes = recipes.filter((recipe) => recipe.id !== id);
// setRecipes(newRecipes);
// history.push("/recipes")

      function deleteClass(id){
        authAxios()
            .delete(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`)
            .then(res => console.log("Deleted!", res))
            .catch(err => console.log(err))
        }

      useEffect(() => {
          readClasses()
      },[])

    return(
        <>

            <h1>Anywhere Fitness!</h1>
            
              {currentClasses ? currentClasses.map((session, index) => {
        return(
            <div>
                <ClassCard key={index} session={session} />
            </div>
            ) 
        }  ) : null 
    }
           {/* <Route path="/add-new-class" render={() => <NewClassForm setCurrentClasses={setCurrentClasses} /> }/> */}

           {/* <Link to="/add-new-class">
                <button>click</button>
           </Link> */}

            <NewClassForm currentClasses={currentClasses} />
             
            <UpdateFitnessClass  putClass={putClass} />


        </>
    )

}
const mapStateToProps = (state) => {
    return {
        currentClasses: state.currentClasses //maps over smurfs in our state and assigns it
    }                         // to what we assign as a key
}

export default connect(mapStateToProps, {readClasses})(Instructor)