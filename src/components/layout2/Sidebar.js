import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {menuList} from '../../utils/menu';
import config from '../../utils/config'

const Sidebar = ({ isMainMenuCollapse, isSubMenu, toggleSubMenu, setIsSubMenu }) => {
  const location = useLocation();

  const [isMenuCollapse,setIsMenuCollapse] = useState(false);
  const [menuId,setMenuId] = useState(null);
  const [isSubMenuCollapse,setIsSubMenuCollapse] = useState(false);
  const [subMenuId,setSubMenuId] = useState(null);

  const toggleMenuCollapse = (id) => {
    if(menuId && menuId!=id){
      setIsMenuCollapse(true);
    }else{
      setIsMenuCollapse(!isMenuCollapse);
    }
    setMenuId(id);
  }

  
  const toggleSubMenuCollapse = (id) => {
    if(subMenuId && subMenuId!=id){
      setIsSubMenuCollapse(true);
    }else{
      setIsSubMenuCollapse(!isSubMenuCollapse);
    }
    setSubMenuId(id);
  }

   useEffect(() => {
    menuList.forEach(menu => {
      if (menu.sub_menu) {
        menu.sub_menu.forEach(sub => {
          // CASE 1: submenu without sub-submenu
          if (!sub.sub_menu && location.pathname.startsWith(sub.url)) {
            setMenuId(menu.id);
            setIsMenuCollapse(true);
            
          }

          // CASE 2: submenu with sub-submenu
          if (sub.sub_menu) {
            sub.sub_menu.forEach(child => {
              if (location.pathname.startsWith(child.url)) {
                setMenuId(menu.id);
                setIsMenuCollapse(true);
                setSubMenuId(sub.id);
                setIsSubMenuCollapse(true);
                
              }
            });
          }
        });
      }
    });
  }, [location.pathname]);

  return (
    <>
      
      <nav className="nxl-navigation">
          <div className="navbar-wrapper">
              <div className="m-header">
                  <a href="index.html" className="b-brand">
                      <img src="assets/images/logo-full.png" alt="" className="logo logo-lg"/>
                      <img src="assets/images/logo-abbr.png" alt="" className="logo logo-sm"/>
                  </a>
              </div>
              <div className="navbar-content" onMouseEnter={isMainMenuCollapse ? toggleSubMenu : undefined}
    onMouseLeave={isMainMenuCollapse ? toggleSubMenu : undefined}>
                  <ul className="nxl-navbar">
                      <li className="nxl-item nxl-caption">
                          <label>Navigation</label>
                      </li>
                      {menuList.map(eachMenu => (
                        <li key={eachMenu.id} className={`nxl-item nxl-hasmenu ${(isMenuCollapse && menuId==eachMenu.id) ? "nxl-trigger active" : ""}`} id={eachMenu.id} >
                            <Link to={eachMenu.url} className="nxl-link" onClick={() => toggleMenuCollapse(eachMenu.id)}>
                                <span className="nxl-micon"><i className="feather-airplay"></i></span>
                                <span className="nxl-mtext">{eachMenu.name}</span>
                                {eachMenu.sub_menu != null && eachMenu.sub_menu !== '' && (
                                <span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                                )}
                            </Link>
                            {eachMenu.sub_menu != null && eachMenu.sub_menu !== '' && (
                            <ul className="nxl-submenu" style={{display: (isMenuCollapse && menuId==eachMenu.id && isSubMenu) ? "block" : "none"}}>
                                {eachMenu.sub_menu.map(eachSubMenu => (
                                  <React.Fragment key={eachSubMenu.id}>

                                  {eachSubMenu.sub_menu != null && eachSubMenu.sub_menu != '' ? (
                                    <li className={`nxl-item nxl-hasmenu ${(isSubMenuCollapse && eachSubMenu.id == subMenuId) ? "nxl-trigger active" : ""}`}>
                                        <Link to={eachSubMenu.url} className="nxl-link" onClick={() => toggleSubMenuCollapse(eachSubMenu.id)}>
                                            <span className="nxl-mtext">{eachSubMenu.name}</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                                        </Link>
                                        <ul className="nxl-submenu" style={{display: (isSubMenuCollapse && eachSubMenu.id == subMenuId) ? "block" : "none"}}>
                                          {eachSubMenu.sub_menu.map(eachSubSubmenu => (
                                            <li key={eachSubSubmenu.id} className={`nxl-item ${location.pathname.startsWith(eachSubSubmenu.url) ? 'active' : ''}`} ><Link to={eachSubSubmenu.url} className="nxl-link">{eachSubSubmenu.name}</Link></li>
                                          ))}
                                        </ul>
                                    </li>
                                  ) :
                                  (
                                    <li className={`nxl-item ${location.pathname.startsWith(eachSubMenu.url) ? 'active' : ''}`}><Link to={eachSubMenu.url} className="nxl-link" >{eachSubMenu.name}</Link></li>
                                  )}
                                  </React.Fragment>
                                ))}
                            </ul>)}
                        </li>
                      ))}
                      {/* <li className={`nxl-item nxl-hasmenu ${isMenuCollapse ? "nxl-trigger" : ""}`}>
                          <a className="nxl-link" onClick={toggleMenuCollapse}>
                              <span className="nxl-micon"><i className="feather-cast"></i></span>
                              <span className="nxl-mtext">Reports</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                          </a>
                          <ul className="nxl-submenu" style={{display: isMenuCollapse ? "block" : "none"}}>
                              <li className="nxl-item"><a className="nxl-link" href="reports-sales.html">Sales Report</a></li>
                              <li className="nxl-item"><a className="nxl-link" href="reports-leads.html">Leads Report</a></li>
                              <li className="nxl-item"><a className="nxl-link" href="reports-project.html">Project Report</a></li>
                              <li className="nxl-item"><a className="nxl-link" href="reports-timesheets.html">Timesheets Report</a></li>
                          </ul>
                      </li> */}
                  </ul>
                  
              </div>
          </div>
      </nav>
    </>
  )
}

export default Sidebar