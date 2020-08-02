import React from 'react'
import {Route, Redirect} from "react-router-dom"

export const ClientRoute = ({ component: Component, ...rest }) => (     // Ask what component: Component means.
         <Route 
             {...rest} 
             render={props => 
                localStorage.getItem("token") ? (
                        <Component {...props} />
                    ) : ( <Redirect to="/" /> ) 
            }  
        /> 
        
)