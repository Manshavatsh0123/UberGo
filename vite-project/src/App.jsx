import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainProtectWrapper from "./pages/CaptainProtectedWrapper";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captainriding' element={<CaptainRiding />} />
        <Route path='/captainlogin' element={<CaptainLogin />} />
        <Route path='/captainsignup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>} />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>} />
        <Route path='/CaptainHome' element={
          <UserProtectedWrapper>
            <CaptainHome />
          </UserProtectedWrapper>
        } />
        <Route path='/captions/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      </Routes>

      {/* ✅ Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
