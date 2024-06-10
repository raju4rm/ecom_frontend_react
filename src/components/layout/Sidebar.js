import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {menuList} from '../../utils/menu';
import config from '../../utils/config'

const Sidebar = () => {
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const [menuOpenId,setMenuOpenId]=useState('');
  const [isSubMenuOpen,setIsSubMenuOpen]=useState(false);
  const [menuSubOpenId,setMenuSubOpenId]=useState('');

  const menuToggle = (id) => {
    setIsMenuOpen(!isMenuOpen)
    setMenuOpenId(id)
  }
  const menuSubToggle = (id) => {
    setIsSubMenuOpen(!isSubMenuOpen)
    setMenuSubOpenId(id)
  }

  useEffect(() => {
    if(menuOpenId){
      var element = document.getElementById(menuOpenId);      
      if(isMenuOpen){
        element.classList.add("menu-is-opening");
        element.classList.add("menu-open");
      }else{
        element.classList.remove("menu-is-opening");
        element.classList.remove("menu-open");
      }
      
    }
    if(menuSubOpenId){
      var element = document.getElementById(menuSubOpenId);      
      
      if(isSubMenuOpen){
        element.classList.add("menu-is-opening");
        element.classList.add("menu-open");
      }else{
        element.classList.remove("menu-is-opening");
        element.classList.remove("menu-open");
      }
    }
  },[isMenuOpen,isSubMenuOpen])
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link  className="brand-link">
          <img
            src="/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-high" style={{ color:'#000' }}>{config.siteName}</span>
        </Link>
        <div className="sidebar">
          <div className="user-panel  pb-3 mb-3 d-flex" style={{ marginTop: '15px' }}>
            <div className="image" >
              <img
                src="/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <Link  className="d-block">
                Alexander Pierce
              </Link>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column nav-child-indent nav-compact"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* <li className="nav-header">MULTI LEVEL EXAMPLE</li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fas fa-circle nav-icon" />
                  <p>Level 1</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-circle" />
                  <p>
                    Level 1
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Level 2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Level 2
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="far fa-dot-circle nav-icon" />
                          <p>Level 3</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="far fa-dot-circle nav-icon" />
                          <p>Level 3</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="far fa-dot-circle nav-icon" />
                          <p>Level 3</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Level 2</p>
                    </a>
                  </li>
                </ul>
              </li> */}
              {menuList.map(eachMenu => (
                <React.Fragment key={eachMenu.id}>
                  {eachMenu.label != null && eachMenu.label !== '' && (
                    <li className="nav-header" key={eachMenu.id + '-label'}>{eachMenu.label}</li>
                  )}                    
                  <li className="nav-item" id={eachMenu.id} key={eachMenu.id}>
                    <a href={eachMenu.url} className="nav-link" onClick={() => menuToggle(eachMenu.id)}>
                      <i className="nav-icon fas fa-circle" />
                      <p>
                        {eachMenu.name}
                        {eachMenu.sub_menu != null && eachMenu.sub_menu !== '' && (
                          <i className="right fas fa-angle-left" />
                        )}
                      </p>
                    </a>
                    {eachMenu.sub_menu != null && eachMenu.sub_menu !== '' && (
                      <ul className="nav nav-treeview">
                        {eachMenu.sub_menu.map(eachSubMenu => (
                          <li className="nav-item"  id={eachSubMenu.id} key={eachSubMenu.id}>
                            <a href={eachSubMenu.url} className="nav-link" onClick={() => menuSubToggle(eachSubMenu.id)}>
                              <i className="far fa-circle nav-icon" />
                              <p>
                                {eachSubMenu.name}
                                {eachSubMenu.sub_menu != null && eachSubMenu.sub_menu !== '' && (
                                  <i className="right fas fa-angle-left" />
                                )}
                              </p>
                            </a>
                            {eachSubMenu.sub_menu != null && eachSubMenu.sub_menu !== '' && (
                              <ul className="nav nav-treeview">
                                {eachSubMenu.sub_menu.map(eachSubSubMenu => (
                                    <li className="nav-item" key={eachSubSubMenu.id}>
                                      <a href={eachSubSubMenu.url} className="nav-link" id={eachSubSubMenu.id}>
                                        <i className="far fa-dot-circle nav-icon" />
                                        <p>{eachSubSubMenu.name}</p>
                                      </a>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </React.Fragment>
              )
              )}

            </ul>
          </nav>
        </div>
    </aside>
  )
}

export default Sidebar