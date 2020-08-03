import React from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';

import {InstructorRoute} from './Components/PrivateRoute/InstructorRoute';
import RegClient from './Components/RegClient';
import Instructor from './Components/Instructor/Instructor';
import Client from './Components/Client/Client';
import Home from "../src/Components/Home";
import RegInstructor from "./Components/RegInstructor";
import Login from "../src/Components/Login";
import { ClientRoute } from './Components/PrivateRoute/ClientRoute';

import "./App.css";


function App() {

  function deleteClass(id){
    axios
        .delete(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`)
        .then(res => console.log("Deleted!", res.data))
        .catch(err => console.log(err))
}

// function putClass(id, updatedClass){
//   axios.put(`https://anywhere-fitness-app1.herokuapp.com/api/classes/${id}`, updatedClass)
//         .then(res => console.log(res))
//         .catch(err => console.log(err));
//         // push the user back to the classes
// };

  
  return (
    <div className="App">      

      <Route exact path="/" component={Home} />
      
      <Route exact path="/client-registration" component={RegClient} />

      <Route exact path="/instructor-registration" component={RegInstructor} />

      <Route path="/user-login" component={Login} />  

      <ClientRoute exact path="/client" component={Client} />

      <InstructorRoute exact path="/instructor" component={Instructor}/>
      
    </div>
  );

}


export default App;
