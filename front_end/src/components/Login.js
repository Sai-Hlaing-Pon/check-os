import React, {useState} from 'react'
import { Redirect, withRouter} from "react-router-dom"
import './Login.css'
import firebase from '../Firebase/config'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [routeRedirect, setRedirect] = useState(false);

    const login = async(e) => {
        e.preventDefault();
        let response = await firebase.login(email, password);
        if(response.hasOwnProperty("message")) {
            console.log(response.message);
        }
        if(response.hasOwnProperty("user")) {
            console.log(response.user);
            setRedirect(true);
        }

    }

    const redirect = routeRedirect;
    if(redirect) {
        return <Redirect to="/" />
    }

    return (
        <React.Fragment>
            <div className="login">
                <div className="container">
                <form onSubmit={login}>
                    <h1>Welcome Back</h1>
                    <label htmlfor="email">Email:</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                    <br/>
                    <label htmlfor="password">Password:</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    <br/> <br/>
                    <input type="submit" value="Login" />
                   
                </form>
                </div>
            
            </div>
        </React.Fragment>
    )
}
export default withRouter(Login)
