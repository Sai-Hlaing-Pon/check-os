import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import firebase from "../Firebase/config"
import Sidebar from './Sidebar/Sidebar'
import Widgets from './Widget/Widgets'
import Feed from './Feed/Feed'
import './../App.css'
const Main = () => {
    
    return (               
           
            <div className="app">
                <div className="app__body">
                    <Sidebar />
                    <Feed />
                    <Widgets />
                </div>
            </div>
            
       
    )
}

export default Main;
//<div style={{ backgroundImage: "url(" + post.data.cover + ")" }} />