import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../images/avatar-mcmpbll.jpg'

const NavBar = () => {
  return (
  <div className="nav-bar" >
    <Link to="/" ><h1>React Challange</h1></Link>
    <a href="http://www.mariocampbell.com.ar" target="_blank" rel="noopener noreferrer" ><div className="avatar" style={{backgroundImage: `url(${avatar})`}} ></div></a>
  </div>
  )
}

export default NavBar
