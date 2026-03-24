import React ,{useEffect, useState, useRef} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import {logoutA} from '../../store/login/action';
import { useDispatch, useSelector } from 'react-redux';
import { useMantineColorScheme } from '@mantine/core';


const Header = ({ isMainMenuCollapse, setIsMainMenuCollapse, toggleSubMenu }) => {
    const [isProfileCollapse,setIsProfileCollapse] = useState(true)
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [isFullScreen,setIsFullScreen] = useState(false)
    const dispatch                  = useDispatch();
    const navigate = useNavigate();
    const { colorScheme, setColorScheme } = useMantineColorScheme();



    const toggleMenuCollapse = () => {
        const newCollapseState = !isMainMenuCollapse; // compute next state
        setIsMainMenuCollapse(newCollapseState);

        if (newCollapseState) {
            document.documentElement.classList.add("minimenu")
        }else{
            document.documentElement.classList.remove("minimenu")
        }
        toggleSubMenu();
    }

    const toggleProfileCollapse = () => {
        setIsProfileCollapse(!isProfileCollapse)
    }

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    useEffect(() => {
              
        if (isDark) {
            document.documentElement.classList.add('app-skin-dark');
            localStorage.setItem('theme', 'dark');
            setColorScheme('dark')
        } else {
            document.documentElement.classList.remove('app-skin-dark');
            localStorage.setItem('theme', 'light');
            setColorScheme('light')
            
        }
    }, [isDark]);


    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen)
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    const handleLogout = async () => {
        await dispatch(logoutA());
        navigate("/login", { replace: true });
    };
  return (
    <>
        <header className="nxl-header">
            <div className="header-wrapper">
            <div className="header-left d-flex align-items-center gap-4">
                <a  className="nxl-head-mobile-toggler" id="mobile-collapse">
                    <div className="hamburger hamburger--arrowturn">
                        <div className="hamburger-box">
                            <div className="hamburger-inner"></div>
                        </div>
                    </div>
                </a>
                <div className="nxl-navigation-toggle">
                    <Link  id="menu-mini-button" style={{display: isMainMenuCollapse ?  "none" :"block"}} onClick={toggleMenuCollapse}>
                        <i className="feather-align-left"></i>
                    </Link>
                    <Link  id="menu-expend-button" style={{display: isMainMenuCollapse ? "block" : "none"}} onClick={toggleMenuCollapse}>
                        <i className="feather-arrow-right"></i>
                    </Link>
                </div>
                <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                    <a  id="nxl-lavel-mega-menu-open">
                        <i className="feather-align-left"></i>
                    </a>
                </div>
                <div className="nxl-drp-link nxl-lavel-mega-menu">
                    <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                        <a id="nxl-lavel-mega-menu-hide">
                            <i className="feather-arrow-left me-2"></i>
                            <span>Back</span>
                        </a>
                    </div>
                    
                </div>
            </div>
            <div className="header-right ms-auto">
                <div className="d-flex align-items-center">
                    
                    <div className="nxl-h-item d-none d-sm-flex">
                        <div className="full-screen-switcher">
                            <a  className="nxl-head-link me-0" onClick={toggleFullScreen}>
                                <i className={` ${isFullScreen ? "feather-minimize " : "feather-maximize " }`}></i>
                                {/* {isFullScreen ? (                              
                                    <i className="feather-minimize minimize"></i>
                                ) : (
                                    <i className="feather-maximize maximize"></i>
                                )} */}
                            </a>
                        </div>
                    </div>
                    <div className="nxl-h-item dark-light-theme">
                        { isDark ? (
                            <a  className="nxl-head-link me-0 light-button"  onClick={toggleTheme}>
                                <i className="feather-sun"></i>
                            </a>
                        ) : (
                            <a  className="nxl-head-link me-0 dark-button"  onClick={toggleTheme}>
                                <i className="feather-moon"></i>
                            </a>
                        )}
                    </div>
                    <div className="dropdown nxl-h-item">
                        <a  className="nxl-head-link me-0" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                            <i className="feather-clock"></i>
                            <span className="badge bg-success nxl-h-badge">2</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-timesheets-menu">
                            <div className="d-flex justify-content-between align-items-center timesheets-head">
                                <h6 className="fw-bold text-dark mb-0">Timesheets</h6>
                                <a  className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Upcomming Timers">
                                    <i className="feather-clock"></i>
                                    <span>3 Upcomming</span>
                                </a>
                            </div>
                            <div className="d-flex justify-content-between align-items-center flex-column timesheets-body">
                                <i className="feather-clock fs-1 mb-4"></i>
                                <p className="text-muted">No started timers found yes!</p>
                                <a  className="btn btn-sm btn-primary">Started Timer</a>
                            </div>
                            <div className="text-center timesheets-footer">
                                <a  className="fs-13 fw-semibold text-dark">Alls Timesheets</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown nxl-h-item">
                        <a className="nxl-head-link me-3" data-bs-toggle="dropdown" href="#" role="button" data-bs-auto-close="outside">
                            <i className="feather-bell"></i>
                            <span className="badge bg-danger nxl-h-badge">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                            <div className="d-flex justify-content-between align-items-center notifications-head">
                                <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                                <a  className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Make as Read">
                                    <i className="feather-check"></i>
                                    <span>Make as Read</span>
                                </a>
                            </div>
                            <div className="notifications-item">
                                <img src="assets/images/avatar/2.png" alt="" className="rounded me-3 border"/>
                                <div className="notifications-desc">
                                    <a  className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Malanie Hanvey</span> We should talk about that at lunch!</a>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="notifications-date text-muted border-bottom border-bottom-dashed">2 minutes ago</div>
                                        <div className="d-flex align-items-center float-end gap-2">
                                            <a  className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                            <a  className="text-danger" data-bs-toggle="tooltip" title="Remove">
                                                <i className="feather-x fs-12"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center notifications-footer">
                                <a  className="fs-13 fw-semibold text-dark">Alls Notifications</a>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown nxl-h-item" 
                        onMouseEnter={toggleProfileCollapse}
                        onMouseLeave={toggleProfileCollapse}
                    >
                        <a  data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside" className={` ${ !isProfileCollapse ? "show" : ""}`}>
                            <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0"
                            
                            />
                        </a>
                        <div className={`dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown ${ !isProfileCollapse ? "show" : ""}`}>
                            <div className="dropdown-header">
                                <div className="d-flex align-items-center">
                                    <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar"/>
                                    <div>
                                        <h6 className="text-dark mb-0">Alexandra Della <span className="badge bg-soft-success text-success ms-1">PRO</span></h6>
                                        <span className="fs-12 fw-medium text-muted">alex@example.com</span>
                                    </div>
                                </div>
                            </div>
                            
                            <a  className="dropdown-item">
                                <i className="feather-user"></i>
                                <span>Profile Details</span>
                            </a>
                            
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item" onClick={handleLogout}>
                                <i className="feather-log-out"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </header>
    </>
  )
}

export default Header