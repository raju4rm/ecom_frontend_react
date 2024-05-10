import React, { useCallback, useEffect, useRef, useState  } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

const Main = () => {
  document.body.classList.add('hold-transition');
  document.body.classList.add('sidebar-mini');
  document.body.classList.add('layout-navbar-fixed');
  document.body.classList.add('layout-footer-fixed');
  document.body.classList.add('text-sm');
  document.body.classList.add('sidebar-collapse');

  document.body.classList.remove('login-page');
  document.body.classList.remove('hold-transition');
  document.body.removeAttribute('style');

  const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const threshold = window.screen.width * 0.36; 

      setIsSmallScreen(screenWidth <= 986);
      console.log(screenWidth,threshold,isSmallScreen)
    };

    
  window.addEventListener('resize', handleResize);
  useEffect(() => {
    const updateBodyClass = () => {
      if (isSmallScreen) {
        document.body.classList.add('sidebar-closed');
        document.body.classList.remove('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-closed');
        document.body.classList.remove('sidebar-open');
      }
    };

    updateBodyClass();

  }, [isSmallScreen]);


  const handleClick = () => {
    document.body.classList.remove('sidebar-open');
    setIsSmallScreen(!isSmallScreen)
  };
  
    
  return (
    <>
      <div className="wrapper">
        <Header/>
        <Sidebar/>
          <Outlet />
        <Footer/>
        <div id="sidebar-overlay" onClick={handleClick}></div>
      </div>
    </>
  )  
}

export default Main