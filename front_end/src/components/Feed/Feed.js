import React, { useEffect, useState } from 'react'
import "../Feed/Feed.css"
import { Link } from "react-router-dom"
import firebase from "../../Firebase/config"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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

const Feed = () => {

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        let _posts = [];
        const postsArray = await firebase.getPosts().catch(err => {
            console.log(err);
        });

        postsArray.forEach(doc => {
            _posts.push({ id: doc.id, data: doc.data() });
        });
        setPosts(_posts);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (

        <div className="feed">

            {posts.map(post => {
                return (
                    <div className="post">
                        <div className="post__top">
                            <div className="post__image">
                                <img src={post.data.cover} alt="" />
                            </div>
                            <div className="post__topInfo">
                             <div className="post" key={post.id}>
                                    
                                    <Link to={"post/" + post.id}>
                                        <p>{post.data.title}</p>
                                    </Link>
                                </div>   
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
                                    <h5>{/** {category} **/}</h5></div>
                                {/** <p>{new Date(timestamp?.toDate()).toUTCString()}</p>*/}
                            </div>

                            <div className="badge"><p> Customer Verified</p></div>

                        </div>


                            <div className="post__bottom">
                                <p>{post.data.content}</p>
                            </div>

                            <div className="post__options">
                                <div className="post__option">
                                    <ChatBubbleOutlineIcon />
                                    <p>Write Review</p>
                                </div>

                                <div className="post__option">
                                     <p>Learn More</p>
                                </div>
                            </div>
                            <div>

                            </div>
                                
                        </div> 
                )
            })}
        </div>





    )
}


//<div style={{ backgroundImage: "url(" + post.data.cover + ")" }} />
export default Feed
