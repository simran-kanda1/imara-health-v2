import React from 'react';
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard.jsx"
import LoginPage from "./LoginPage/LoginPage.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" exact element={<Dashboard/>}/>
                <Route path= "/" exact element= {<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;