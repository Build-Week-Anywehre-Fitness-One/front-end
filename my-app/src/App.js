import React from 'react';
import './App.css';
import Client from './Component/Client';
import { Route } from "react-router-dom";
import Home from "./Component/Home";
import Instructor from "./Component/Instructor";
import Login from './Component/Login';

function App() {

  return (
    <div className="App">

      <Route exact path="/" component={Home} />
      
      
      <Route path="/client-registration" component={Client} />

      <Route path="/instructor-registration" component={Instructor} />

      <Route path="/user-login" component={Login} />

    </div>
  );
}

export default App;
