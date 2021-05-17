import React, {useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../Firebase/config'
import SearchIcon from '@material-ui/icons/Search';
import './Header.css'
const Header = (props) => {
    const [userState, setuserState] = useState(null);

    useEffect(()=> {
        firebase.getUserState().then(user => {
            if(user) {
                setuserState(user);
            }
        })
    })
    const logout = () => {
        //logout the user
        firebase.logout();
        setuserState(null);
        props.history.replace("/login");
        
    }

    let buttons;
        if(userState != null) {
            buttons = (
                <React.Fragment>
                    <button className="logout" onClick={logout}>Log Out</button>
                </React.Fragment>
            )        
        } else {
            buttons = (
                <React.Fragment>
                   <Link to="/signup" style={{ textDecoration: 'none', color: 'black', marginRight: '70px'}}>Sign Up</Link>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'black', marginRight: '70px'}}>Login</Link>

                </React.Fragment>
            )        
        }

    return (
         <div className="header">
            <div className="header__left">
            <Link to="/" style={{ textDecoration: 'none', color: 'black'}}> 
                <h1 >Check OS</h1>
            </Link>
            </div>

            <div className="header_middle">
                 <div className="header__input">
                 <SearchIcon />
                    <input placeholder="Search your shop" type="text" />
                </div>
            </div>

            <div className="header__right">
                <div className="header__info">
                <Link  to="/create" style={{ textDecoration: 'none', color: 'red', marginRight: '70px'}}>New post</Link>
                {buttons}
                </div>
            </div>

        

        
    </div>
    )
}

export default withRouter(Header);