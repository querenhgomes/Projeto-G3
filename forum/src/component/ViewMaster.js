import Sidebar from './sidebar';
import Post from './post';
import Moodal from './modal';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function Master() {
    return(
        <>
        <Sidebar></Sidebar>


            </>

    );
    }
export default Master;
