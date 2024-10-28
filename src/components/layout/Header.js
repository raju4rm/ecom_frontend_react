import React ,{useEffect, useState, useRef} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import {logoutA} from '../../store/login/action';
import { useDispatch, useSelector } from 'react-redux'; 

const Header = () => {
  
  const navigate = useNavigate();
  const dispatch                  = useDispatch();

  const [isMenuCollapse,setIsMenuCollapse]=useState(true);
  const [isHeaderMenuOpen,setIsHeaderMenuOpen]=useState(false);
  const [isHeaderMenuOpenClass,setIsHeaderMenuOpenClass]=useState(false);
  const prevValue1Ref = useRef('');
  const asideRef = useRef(null);

  const toggleMenuCollapse= () => {
    setIsMenuCollapse(!isMenuCollapse);

  }

  const headerMenuToggle= (className) => {
    setIsHeaderMenuOpen(!isHeaderMenuOpen);
    setIsHeaderMenuOpenClass(className);
  }

  useEffect(() => { // outside click to close open header menu start
    const handleClickOutside = (event) => {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        setIsHeaderMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
  }, [asideRef]); // outside click to close open header menu end


  useEffect(() => { // header menu toggle start
    var elements = document.getElementsByClassName(isHeaderMenuOpenClass);      
    if(prevValue1Ref.current != isHeaderMenuOpenClass){
      
      var pervElements = document.getElementsByClassName(prevValue1Ref.current); 
      setIsHeaderMenuOpen(true);   
      if (pervElements.length > 0) {
        var pervElement1 = pervElements[0]; 
        pervElement1.classList.remove("show");
        var pervElement2 = pervElements[1]; 
        pervElement2.classList.remove("show");
      }
    }
    prevValue1Ref.current = isHeaderMenuOpenClass;

    if(isHeaderMenuOpen){
      if (elements.length > 0) {
        var element1 = elements[0]; 
        element1.classList.add("show");
        var element2 = elements[1]; 
        element2.classList.add("show");
      }    
    }else{
      if (elements.length > 0) {
        var element1 = elements[0]; 
        element1.classList.remove("show");
        var element2 = elements[1]; 
        element2.classList.remove("show");
      }
    }
  },[isHeaderMenuOpenClass,isHeaderMenuOpen]) // header menu toggle end


  

  useEffect(() => { // sidebar collapse toggle start
    const screenWidth = window.innerWidth;
    if(isMenuCollapse){
      document.body.classList.add('sidebar-collapse');
      if(screenWidth <= 986){
        document.body.classList.add('sidebar-closed');
      }else{
        document.body.classList.remove('sidebar-open');
      }

    }else{
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.remove('sidebar-closed');
      if(screenWidth <= 986){
        
        document.body.classList.add('sidebar-open');
        document.body.classList.remove('sidebar-collapse');
      }
    }

  },[isMenuCollapse]) // sidebar collapse toggle start

  const logout = () => {
    dispatch(logoutA());
    navigate('/login')
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu"  role="button" onClick={toggleMenuCollapse}>
              <i className="fas fa-bars" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link className="nav-link">
              Home
            </Link>
          </li>
          
        </ul>
        <ul className="navbar-nav ml-auto" ref={asideRef}>
          
          
          <li className="nav-item dropdown notification" onClick={() => headerMenuToggle('notification')}>
            <Link className="nav-link" data-toggle="dropdown" >
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">15</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right notification">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider" />
              <Link  className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </Link>
              <div className="dropdown-divider" />
              <Link  className="dropdown-item">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </Link>
              <div className="dropdown-divider" />
              <Link  className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </Link>
              <div className="dropdown-divider" />
              <Link  className="dropdown-item dropdown-footer">
                See All Notifications
              </Link>
            </div>
          </li>
          
          <li className="nav-item dropdown user-profile" style={{backgroundColor:"#007bff",borderRadius: "5px"}} onClick={() => headerMenuToggle('user-profile')}>
            <Link className="nav-link" data-toggle="dropdown" >
            <img src="/img/user2-160x160.jpg" className="img-circle elevation-2 user-panel" alt="User Image" style={{width: "28px",marginRight: "12px",marginTop:"-5px"}}/>
            <span className="hidden-xs">Alexander Pierce</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right user-profile">
              <div  className="dropdown-item" style={{height:"180px",textAlign: "center",backgroundColor:"#007bff"}}>
                <img src="img/user2-160x160.jpg" className="img-circle elevation-2 user-panel" alt="User Image" style={{width: "100px",marginRight: "12px",marginTop:"5px"}}/>
                <h3 className='card-title' style={{color:"#fff",marginTop:"5px"}}>
                Alexander Pierce - Web Developer
                </h3>
                <p  style={{fontSize:"13px",color:"#fff"}}>Member since Nov. 2012</p>

              </div>
              <div className="dropdown-divider" />
              <div  className="dropdown-item" style={{height:"50px",textAlign: "center"}}>
                <div style={{float:"left"}}>
                  <a href="#" className="btn btn-default btn-flat">Profile</a>
                </div>
                <div style={{float:"right"}}>
                  <a  onClick={logout} className="btn btn-default btn-flat">Sign out</a>
                </div>
              </div>
            </div>
          </li>

          
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="fullscreen"
              
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </Link>
          </li>
        </ul>
    </nav>
  )
}

export default Header