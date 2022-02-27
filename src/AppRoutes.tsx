import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Footer from './pages/component/Footer';
import HomePage from './pages/HomePage';

import NotFoundPage from './pages/NotFoundPage';
import VerifyPage from './pages/VerifyPage';

import './App.css';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="/vote" element={<NotFoundPage />} />
                    <Route path="/result" element={<NotFoundPage />} />
                    <Route path="/result/:electionId" element={<NotFoundPage />} />
                    <Route element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

function Layout() {
    return (
        <div className='App'>
            <Outlet />
            {/* <hr /> */}
            <Footer />
        </div>
    );
}

export default AppRoutes;