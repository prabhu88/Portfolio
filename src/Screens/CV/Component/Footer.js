import React from "react";
import { experimentalStyled as makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import Instagram from "@material-ui/icons/Instagram";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './footer.scss'
import { green,grey,red } from '@material-ui/core/colors';
import {Link,} from 'react-router-dom'

const Footer = () => {  
  
  return (
    <BottomNavigation className="bottomNavContainer">
      <Link to="/My-CV/Resume" className = ""> 
        Resume
      </Link>
      <BottomNavigationAction icon={<LinkedInIcon />} className="root" sx={{ color: green[400] }}
      onClick={()=> window.open("https://www.linkedin.com/in/prabhu-s-99146921a/", "_blank")} />
      <BottomNavigationAction className="root" icon={<Twitter sx={{ color: green[400] }} />}  />
      <BottomNavigationAction className="root" icon={<Instagram sx={{color:red[150]}} />} />
    </BottomNavigation>
  );
};
export default Footer;