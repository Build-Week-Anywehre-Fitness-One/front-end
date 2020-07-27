import React from 'react';
import axios from 'axios';
// import {Route, Link} from 'react-router-dom';
import {InstructorRoute} from './Components/PrivateRoute/InstructorRoute';
import Instructor from './Components/Instructor/Instructor';

function App() {
  
  return (
    <div className="App">
      {/* //Make a Route to home that renders the Login page. */}

      <InstructorRoute to="/Instructor" component={Instructor}/>
    </div>
  );
}

export default App;
