import React from 'react';
import "../Sidebar/Sidebar.css";
import SidebarRow from "../Sidebar/elements/SidebarRow";
import CompareIcon from '@material-ui/icons/Compare';
import StorefrontIcon from  "@material-ui/icons/Storefront";
import PeopleIcon from  "@material-ui/icons/People";
import WarningIcon from '@material-ui/icons/Warning';
import StarsIcon from '@material-ui/icons/Stars';
import { NavLink, withRouter } from "react-router-dom";

function Sidebar() {
  

    return (
        <div className="sidebar">         
                        
           <SidebarRow Icon={PeopleIcon} title="Home" />                               
            <SidebarRow Icon={StorefrontIcon} title="Home Decoration"/>
            <SidebarRow Icon={CompareIcon} title="Clothing"/>
            <SidebarRow Icon={StarsIcon} title="Top Ranking"/>
            <SidebarRow Icon={WarningIcon} title="Issues"/>
        </div>
    )
}

export default Sidebar;
