import Sidebar from "./sidebar";
import Sidenav from "./SideNav";
import Post from "./post";
import Moodal from "./modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Aside from "./Aside";

function Master() {
    return (
        <>
            <Aside />
            <Sidebar></Sidebar>
        {/* <Sidenav></Sidenav> */}
        </>
    );
}
export default Master;
