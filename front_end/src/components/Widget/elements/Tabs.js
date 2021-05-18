import React, { useEffect, useState } from 'react'
import "../../Feed/Feed.css"
import { Link } from "react-router-dom"
import firebase from "../../../Firebase/config"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import './Tabs.css'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
  
 
function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    width: 200,
    display: 'flex',
    marginLeft: 20,
    flexDirection:'column',
    
  },
}));

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  const [hover, setHover] = React.useState(-1);
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
    <div className={classes.root1}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab
            value="one"
            label="Top"
            wrapped
            {...a11yProps('one')}
          />
          <Tab value="two" label="Warning" {...a11yProps('two')} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <div className="rank">
            {posts.map(post => {
                    return (   <div className="rank1">                            
                                    
                                                  <div key={post.id}>                                    
                                                      <Link to={"post/" + post.id} style={{ textDecoration: 'none', fontSize: '10px', fontWeight: 'bold'}} >
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
                                                  
                            </div>                                        
                                    
                    )
                })}
        </div>
      </TabPanel>
      
    </div>
  );
}