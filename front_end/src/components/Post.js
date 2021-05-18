import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router'
import firebase from '../Firebase/config'
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import './Post.css'
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',

    },
});

const Post = (props) => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [post, setPost] = useState(false);

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const fileRef = useRef(null);
    const categoryRef = useRef(null);

    const [postid, setPostId] = useState("");
    const [routeRedirect, setRedirect] = useState(false);


    const getPost = async (postid) => {
        const post = await firebase.getPost(postid).catch(err => {
            console.log(err);
        });
        const postData = post.data(); //postdata
        setPost(postData);
    }

    useEffect(() => {
        setTimer(true);
        setPostId(props.match.params.id);
        getPost(props.match.params.id);

        firebase.getUserState().then(user => {
            if (user) {
                setUserState(true);
            }
        });
        setTimeout(() => setTimer(false), 1000)
    }, [props.match.params.id])

    let currentPost;
    let editButton;
    let deleteButton;

    const updateCurrentPost = (e) => {
        e.preventDefault();
        setIsBusy(true);
        const post = {
            id: postid,
            title: titleRef.current.value,
            content: contentRef.current.value,
            category: contentRef.current.value,
        }
        if (fileRef.current.files.length > 0) {
            post["cover"] = fileRef.current.files[0];
            post["oldcover"] = post.fileref;
        }
        firebase.updatePost(postid, post).then(() => {
            console.log("post updated");
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        })
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const deleteCurrentPost = () => {
        firebase.deletePost(postid, post.fileref)
            .then(() => {
                console.log("image and post deleted")
                setRedirect(true);
            }).catch(err => {
                console.log(err);
            })
    }

    let updateForm;
    if (editMode) {
        deleteButton = <button className="delete" onClick={(e) => deleteCurrentPost()}>Delete Post</button>
        if (isBusy) {
            updateForm = <div className="processing">
                <p>Request is being proccessed</p>
                <div className="loader">Loading......</div>
            </div>
        } else {
            updateForm =
                <React.Fragment>
                    <form className="editForm" onSubmit={updateCurrentPost}>
                        <label htmlFor="title">Post Title:</label>
                        <input type="text" name="title" ref={titleRef} defaultValue={post.title} />

                        <label htmlFor="content">Post Content:</label>
                        <textarea type="content" ref={contentRef} defaultValue={post.content} />

                        <label htmlFor="cover">Post Title:</label>
                        <input type="file" ref={fileRef} />

                        <input type="submit" value="update post" />

                    </form>
                    {deleteButton}
                </React.Fragment>
        }


    }


    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to="/" />
    }

    if (timer) {
        currentPost = <div className="processing">
            <p>Loading Post</p>
            <div className="loader">Loading...</div>
        </div>
    } else {
        if (userState) {
            editButton = <button className="edit" onClick={(e) => toggleEditMode()}>Edit Post</button>
        }
        currentPost = <div className="post">
                        <div className="post__top">
                            <div className="post__image">
                                <img src={post.cover} alt="" />
                            </div>
                            <div className="post__topInfo">
                                <h2 className="title">{post.title}</h2>
                                <div className={classes.root}>
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                    />
                                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                                </div>
                                <h4>12 Reviews</h4>
                                <div className="badge1">
                                    <h5>{post.category}</h5></div>
                                {/** <p>{new Date(timestamp?.toDate()).toUTCString()}</p>*/}
                            </div>

                            <div className="badge"><p> Customer Verified</p></div>

                        </div>


                            <div className="post__bottom">
                                <p>{post.content}</p>
                            </div>

                            <div className="post__options">
                                <div className="post__option">
                                    <ChatBubbleOutlineIcon />
                                    <p>Write Review</p>
                                </div>

                                <div className="post__option">
                                     
                                </div>
                            </div>
                            <div>

                            </div>
                                { editButton }
                                 { updateForm }
                        </div>                      
                                   
                    }

return (
    <React.Fragment>
        {currentPost}
    </React.Fragment>
)
}

export default Post;