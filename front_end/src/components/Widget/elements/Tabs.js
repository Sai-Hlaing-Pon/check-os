import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

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
                
                <div><h3> SHEIN </h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> May Fashion </h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> MyanmarV</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> Myat Su </h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> KyawKyaw OS</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> GoldenMM</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3>Luxery</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3>KO KO</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> Tiktant</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
      </TabPanel>
      <TabPanel value={value} index="two">
      <div className="rank">               
                
                <div><h3> Lazada</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 2 . Shopee</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 3 . MyanmarV</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 4 . SHEIN</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 5 . KyawKyaw</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 6 . GoldenM</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 7 . Luxery</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 8 . KO KO</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
            <div className="rank">               
                
                <div><h3> 10 . Tiktant</h3><br/></div>
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
          <h6>32 reviews</h6>
            </div>
      </TabPanel>
      
    </div>
  );
}