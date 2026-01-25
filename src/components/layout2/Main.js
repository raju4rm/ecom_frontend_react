import React, { useCallback, useEffect, useRef, useState  } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

const Main = () => {
  const [isMainMenuCollapse, setIsMainMenuCollapse] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(true);

  const toggleSubMenu = () => {
    setIsSubMenu(!isSubMenu);
  }
  
  return (
    <>
        <Header isMainMenuCollapse={isMainMenuCollapse} setIsMainMenuCollapse={setIsMainMenuCollapse} isSubMenu={isSubMenu} toggleSubMenu={toggleSubMenu}/>
        <Sidebar isMainMenuCollapse={isMainMenuCollapse} isSubMenu={isSubMenu} toggleSubMenu={toggleSubMenu} setIsSubMenu={setIsSubMenu}/>
          <main className="nxl-container">
          <Outlet />
          <Footer/>
          </main>
    </>
  )  
}

export default Main