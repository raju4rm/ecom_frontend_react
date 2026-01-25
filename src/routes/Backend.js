import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home1 from '../components/Home1';
import Home2 from '../components/Home2';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';
import PermissionMiddleware from '../middleware/PermissionMiddleware';
import Login from '../components/authentication/Login';
import AuthLayout from '../components/layout/Auth';
import MainLayout from '../components/layout/Main';
import MainLayout2 from '../components/layout2/Main';

import RoleAdd from '../components/role/Add'
import RoleList from '../components/role/List'
import RoleEdit from '../components/role/Edit'
import RolePermission from '../components/role/Permission'

import UserAdd from '../components/user/Add'
import UserList from '../components/user/List'
import UserEdit from '../components/user/Edit'

import MasterBrandList from '../components/master/brand/List'
import MasterBrandAdd from '../components/master/brand/Add'
import MasterBrandEdit from '../components/master/brand/Edit'

import MasterCategoryList from '../components/master/category/List'
import MasterCategoryAdd from '../components/master/category/Add'
import MasterCategoryEdit from '../components/master/category/Edit'

import PermissionDenied from '../components/permissionDenied'

import Test from '../components/test/Test'
import TestLayout2Create from '../components/testlayout2/Add'
// import ForgotPassword from '../components/authentication/ForgotPassword';

const Backend = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/permission-denied" element={<PermissionDenied/>} />
        <Route element={<AuthLayout/>}>
          <Route exact path="/login" element={<Login/>} /><Route exact path="/login" element={<Login/>} />
          {/* <Route exact path="/forgot-password" element={<ForgotPassword/>} /> */}
        </Route>
        
        {/* <Route path="/" element={<AuthenticateMiddleware element={<PermissionMiddleware element={<MainLayout />} />} />}
        > */}
        <Route path="/" element={<AuthenticateMiddleware element={<PermissionMiddleware element={<MainLayout2 />} />} />}
        >
          {/* <Route path="/home1" element={<Home1 />} /> */}
          <Route path="/home2" element={<Home2 />} />
          <Route path="/test-layout-2" element={<TestLayout2Create />} />
          <Route path="/test" element={<Test />} />

          {/* Role start */}
          <Route path="/role" element={<RoleList />} />
          <Route path="/role/add" element={<RoleAdd />} />
          <Route path="/role/edit/:id" element={<RoleEdit />} />
          <Route path="/role/permission/:id" element={<RolePermission />} />
          {/* Role end */}

          {/* User start */}
          <Route path="/user" element={<UserList />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/edit/:id" element={<UserEdit />} />
          {/* User end */}

          <Route path="/master">
            <Route path="brand">
              <Route path="" element={<MasterBrandList />} />
              <Route path="add" element={<MasterBrandAdd />} />
              <Route path="edit/:id" element={<MasterBrandEdit />} />
            </Route>

            <Route path="category">
              <Route path="" element={<MasterCategoryList />} />
              <Route path="add" element={<MasterCategoryAdd />} />
              <Route path="edit/:id" element={<MasterCategoryEdit />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default Backend