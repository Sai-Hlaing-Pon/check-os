import React, {useState} from 'react'
import { Redirect, withRouter} from "react-router-dom"
import './Signup.css'

import firebase from '../Firebase/config'

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [routeRedirect, setRedirect] = useState(false);

    const signup = async (e) => {
        e.preventDefault();
        let response = await firebase.signup(email, password);

        if(response.hasOwnProperty("message")) {
            console.log(response.message);
        }
        if(response.hasOwnProperty("user")) {
            console.log(response.user);
            setRedirect(true);
        }
    } 
    //redirect
    const redirect = routeRedirect;
    if(redirect) {
        return <Redirect to="/" />
    }

    return (
        <React.Fragment>
            <div className="login">
                <div className="container">
                    <form onSubmit={signup}>
                        <h1>Register</h1>
                        <p> Sign Up to write your reviews and help prevents newbies from 
                            online shop scaming
                        </p>
                        <label htmlfor="email">Email:</label>
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                        <br/>
                        <label htmlfor="password">Password:</label>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        <br/>
                        <input type="submit" value="Create Account" />
                    </form>
                    </div>
            
            </div>
        </React.Fragment>
    )
}
export default withRouter(Signup)
