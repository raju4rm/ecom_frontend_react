import React from 'react'
import config from '../../utils/config'
const Footer = () => {
  return (
    <footer className="footer">
        <p className="fs-11 text-muted fw-medium text-uppercase mb-0 copyright">
            <span>Copyright ©</span>
            <script>
                document.write(new Date().getFullYear());
            </script>
        </p>
        <p><span>By: <a target="_blank" href="https://wrapbootstrap.com/user/theme_ocean" >theme_ocean</a></span> • <span>Distributed by: <a target="_blank" href="https://themewagon.com" >ThemeWagon</a></span></p>
        <div className="d-flex align-items-center gap-4">
            <a  className="fs-11 fw-semibold text-uppercase">Help</a>
            <a  className="fs-11 fw-semibold text-uppercase">Terms</a>
            <a  className="fs-11 fw-semibold text-uppercase">Privacy</a>
        </div>
    </footer>
  )
}

export default Footer