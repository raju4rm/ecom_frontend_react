import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home1 from '../components/Home1';
import Home2 from '../components/Home2';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';
import PermissionMiddleware from '../middleware/PermissionMiddleware';
import Login from '../components/authentication/Login';
import AuthLayout from '../components/layout/Auth';
import MainLayout from '../components/layout/Main';

import RoleAdd from '../components/role/Add'
import RoleList from '../components/role/List'
import RoleEdit from '../components/role/Edit'

import Test from '../components/test/Test'
// import ForgotPassword from '../components/authentication/ForgotPassword';

const Backend = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route exact path="/login" element={<Login/>} />
          {/* <Route exact path="/forgot-password" element={<ForgotPassword/>} /> */}
        </Route>
        
        {/* <Route path="/" element={<AuthenticateMiddleware element={<PermissionMiddleware element={<MainLayout />} />} />}
        > */}
        <Route path="/" element={<AuthenticateMiddleware element={<PermissionMiddleware element={<MainLayout />} />} />}
        >
            <Route path="/home1" element={<Home1 />} />
            <Route path="/home2" element={<Home2 />} />

            <Route path="/test" element={<Test />} />

            {/* Role start */}
            <Route path="/role" element={<RoleList />} />
            <Route path="/role/add" element={<RoleAdd />} />
            <Route path="/role/edit/:id" element={<RoleEdit />} />
            {/* Role end */}
        </Route>
      </Routes>
    </Router>
  )
}

export default Backend