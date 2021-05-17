import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import firebase from '../Firebase/config'
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon"
import './Create.css'


const Create = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");

    const [isBusy, setIsBusy] = useState(false);
    const [routeRedirect, setRedirect] = useState(false);

    const addPost = async (e) => {
        e.preventDefault();
        setIsBusy(true);

        let post = {
            title,
            content,
            cover: cover[0]
        }

        await firebase.createPost(post).then(() => {
            console.log('successful created');
            setIsBusy(false);
            setRedirect(true);

        }).catch(err => {
            setIsBusy(false);
            console.log(err);

        })
    }

    useEffect(() => {
        firebase.getUserState().then(user => {
            if (!user) {
                props.history.replace("/login");
            }
        })
    })
    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to="/" />
    }


    let createForm;
    if (isBusy) {
        createForm = <div className="processing">
            <p>Request is being processed</p>
            <div className="loader">Loading</div>
        </div>
    } else {
        createForm = <div className="messageSender">
                        <div className="messageSender__top">                      
                            <form onSubmit={addPost}>
                               

                                <label htmlFor="title">Shop Title: </label>
                                <input type="text" className="messageSender__input1" name="title" onChange={(e) => setTitle(e.target.value)} />
                                <br />
                                <label htmlFor="content">Shop Description: </label>
                                <textarea name="content" className="messageSender__input" onChange={(e) => setContent(e.target.value)} />
                                <br />
                                <label htmlFor="cover">Logo: </label>
                                <input type="file" onChange={(e) => setCover(e.target.files)} />
                                <br />

                                <input type="submit" value='create shop' />

                            </form>
                        </div>
                        <div className="messageSender__bottom">
                
                <div className="messageSender__option">
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="messageSender__option">
                    <InsertEmotionIcon style={{ color: "orange" }} />
                    <h3>Rating</h3>
                </div>
            </div>
        </div>
    }


    return (
        <React.Fragment>           
            
                {createForm}              
           
            
        </React.Fragment>
    )
}

export default Create;