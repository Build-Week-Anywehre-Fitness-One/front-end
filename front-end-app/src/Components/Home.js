import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import img from "../Images/signUp_page.jpg";

const Home = () => {

  const HomeContainer = styled.div`
 
    width: 100%;
    display: flex;
    

   section {
    display: flex;
    
    width: 50%;
    height: 110vh;
    background-image: url(${img});
    background-position: 60% 30%;
    background-repeat: no-repeat;
    background-size: cover;
    
   }

   .sign-up {
     width: 50%;
     display: flex;
     flex-direction: column;
     justify-content: space-evenly;
     
   }

   .header {
     font-size: 4.2rem;
     margin: 0 auto;
     
   }

   h3 {
     font-size: 2rem;
     margin: 10px;
   }

   .login {
    font-size: 3rem;
}
   
   
`   
    
  return (
        <HomeContainer>
          <section  />
          
          <div class="sign-up">
          <h1 class="header">Create Account</h1>
           
          <div>
            <h3>User Registration (Client)</h3>
            <Link to="/client-registration">
        <button>Sign Up</button>
          </Link>
          </div>
        
        <div>
        <p className="instructor">
          <h3>User Registration (Instructor)</h3>
            <Link to="/instructor-registration">
        <button>Sign Up</button>
          </Link>
        </p>
        </div>

         
        <div>
        <p>
        <h3 className="login">User Login</h3>
        <Link to="/user-login">
        <button>Login</button>
        </Link>
        </p>
        </div>
        </div>

        </HomeContainer>

    )

}



export default Home;

