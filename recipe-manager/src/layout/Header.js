import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className='conatiner'>
        <div  className='row back'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary back">
  <div className="container-fluid">
    <Link className="navbar-brand" href="#">Recipe Manager</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <div className='p-2 flex-grow-1'>
            <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/allrecipes">Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Features</Link>
            </li>
          </ul>
        </div>
        <div className='p-2'>
          <Link to="/login" className='btn border border-warning '>Login</Link>
          <Link to="/signup" className='btn border border-warning ms-2'>Sign Up</Link>
        </div>    
    </div>
  </div>
</nav>
        </div>
      </div>
    </>
  )
}

export default Header
