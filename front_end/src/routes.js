import React from "react";
import {Switch, Route} from "react-router-dom"
import './App.css'
//components 

import Main from "./components/Main"
import Login from './components/Login'
import Signup from "./components/Signup";
import Create from "./components/Create"
import Post from "./components/Post"
const Routes = () => (
    <Switch>
        <Route exact path="/" component = {Main} />
        <Route exact path="/login" component = {Login} />
        <Route exact path="/signup" component = {Signup} />
        <Route exact path="/create" component = {Create} />
        <Route exact path="/post/:id" component = {Post} />
    </Switch>
    
)

export default Routes;