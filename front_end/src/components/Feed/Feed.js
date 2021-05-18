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
    const [searchTerm, setSearchTerm] = useState('');

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
            <input type="text" 
            className="header__input"
            placeholder="Search...." 
            onChange={(event) => {
                setSearchTerm(event.target.value);
            }} />

            {posts.filter((post) => {
                if (searchTerm == "") {
                    return post
                } else if (post.data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return post  
                }
            }).map((post, key) => {
                return (
                    <div className="post" key={key}>
                        <div className="post__top">
                            <div className="post__image">
                                <img src={post.data.cover} alt="" />
                            </div>
                            <div className="post__topInfo">
                             <div key={post.id}>
                                    
                                    <Link to={"post/" + post.id} style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold'}} >
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
                                    <h5>{post.data.category}</h5></div>
                              
                            </div>

                            <div className="badge">
                                <p> User Verified</p>
                                </div>

                        </div>


                            <div className="post__bottom">
                                <p>{post.data.content}</p>
                            </div>

                            <div className="post__options">
                                <div className="post__option">
                               
                                    <ChatBubbleOutlineIcon /> 
                                    <Link to={"/login"} style={{ textDecoration: 'none', color: 'blue'}}> 
                                    <p>Write Review</p>
                                </Link>
                                </div>

                                <div className="post__option">
                                    <div  key={post.id}>
                                    
                                        <Link to={"post/" + post.id} style={{ textDecoration: 'none'}}> 
                                            <p>Read More</p>
                                        </Link>
                                </div>   
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
