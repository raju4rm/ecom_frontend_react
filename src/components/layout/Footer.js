import React from 'react'
import config from '../../utils/config'
const Footer = () => {
  return (
    <footer className="main-footer">
        
        <strong>
          Copyright © 2014-2021 <a href="#">{config.siteName}</a>.
        </strong>{" "}
        All rights reserved.
    </footer>
  )
}

export default Footer