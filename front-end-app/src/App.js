import React from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import {InstructorRoute} from './Components/PrivateRoute/InstructorRoute';
import Client from '../../front-end-app/src/Components/Client';
import Instructor from './Components/Instructor/Instructor';
import Home from "../../front-end-app/src/Components/Home";
import RegInstructor from "./Components/RegInstructor";
import Login from '../../front-end-app/src/Components/Login';
import "./App.css";


function App() {
  
  return (
    <div className="App">
      {/* //Make a Route to home that renders the Login page. */}
      

      <Route exact path="/" component={Home} />
      
      <Route exact path="/client-registration" component={Client} />

      <Route exact path="/instructor-registration" component={RegInstructor} />

      <Route path="/user-login" component={Login} />  

      <InstructorRoute exact path="/instructor" component={Instructor}/>
    </div>
  );
}



export default App;
