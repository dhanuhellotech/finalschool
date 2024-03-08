import React from "react";
import { Box, Button, Grid, Typography,useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import ButtonLink from "./ButtonLink";
import {useNavigate} from "react-router-dom"
const SideBar = ({closemenu}) => {
const navigate =useNavigate();
    const logout= ()=>{
      localStorage.removeItem("auth")
    navigate("/login")
    }
  return (
    <Grid container
      height="100%"
      width="100%"
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{overflowY:"scroll",paddingTop:"20px"}}
    >
     <Grid item  display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="25%" >
        <img src="assets/images/circlelogo copy.jpg "  width="25%" style={{borderRadius:"15px",marginBottom:"10px"}}/>
        <Typography variant="h6">New Admin</Typography>
     </Grid>
     <Grid item direction="column" height="75%" width="100%" paddingLeft={1} paddingRight={1}>
        <ButtonLink  path="/" text="Home"/>
        <ButtonLink  path="/events" text="Events"/>
        <ButtonLink path="/address" text="Address"/>
        <ButtonLink path="/blog" text="Blog"/>
        <ButtonLink path="/admission" text="Admission"/>
        <ButtonLink  path="/calendar" text="Calendar"/>
             <ButtonLink  path="/contact" text="Contact"/>
             <ButtonLink  path="/enquiry" text="Enquiry"/>
             <ButtonLink  path="/franchise" text="Franchise"/>
             <ButtonLink  path="/class" text="Class"/>
             <ButtonLink  path="/newsletter" text="Newsletter"/>
             <ButtonLink  path="/teacher" text="Teacher"/>
             <ButtonLink  path="/timeTable" text="Timetable"/>
             <ButtonLink  path="/top" text="Tobbar"/>

          
           <button 
  onClick={logout}
        style={{ 
          display: 'block', 
          margin: 'auto', 
          color: 'White', // Change text color
          backgroundColor: 'black', // Change background color
          borderRadius: '5px', // Add rounded corners
          padding: '10px 20px', // Add padding
          border: 'none', // Remove border
          cursor: 'pointer' // Change cursor on hover
        }}
      >
        Logout
      </button>
     </Grid>
    </Grid>
  );
};

export default SideBar;
