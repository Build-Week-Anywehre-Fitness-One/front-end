import React from 'react';
import logo from './logo.svg';
import './App.css';
import Client from './Component/Client'
import Instructor from './Component/ClientLogin'


function App() {

  return (
    <div className="App">

      <Client />
     
      <Instructor />

    </div>
  );
}

export default App;
