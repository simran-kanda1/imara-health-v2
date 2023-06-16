import React from 'react';
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard.jsx"
import LoginPage from "./LoginPage/LoginPage.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    // Fetching message from backend on mount
    useEffect(() => {
        fetch("http://localhost:4000")
            .then((res) => res.json())
    }, []);

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