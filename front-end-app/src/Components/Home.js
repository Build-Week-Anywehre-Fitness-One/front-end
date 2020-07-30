import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    
    return (
        <div>
            <h1>User Registration (Client)</h1>
            <Link to="/client-registration">
            <button>Click</button>
          </Link>
        
        <div className="instructor">
          <h1>User Registration (Instructor)</h1>
            <Link to="/instructor-registration">
        <button>Click</button>
          </Link>
        </div>

         
        
        <div className="login">
        <h1>User login</h1>
        <Link to="/user-login">
        <button>Click</button>
        </Link>
        </div>

        </div>

    )
}

export default Home;