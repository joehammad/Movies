import React from 'react'
import { Link } from 'react-router-dom'

export default function (props) {
  return (
    <div >
     <nav className="navbar navbar-expand-lg navbar-expand-md navbar-dark  ms-2">
        <Link className="navbar-brand" to='home'>NOXE</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto px-4">
            {
              props.userData ?
                <>
                  <li className="nav-item active ">
                    <Link className="nav-link " to="home">Home</Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="movies">movies</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="network">Network</Link>
                  </li>

                </> :
                ''
            }

          </ul>
          <ul className="navbar-nav ms-auto px-4">
            <li className=' me-3 d-flex align-items-center'>
              <i className='fab fa-instagram mx-2'> </i>
              <i className='fab fa-facebook mx-2'> </i>
              <i className='fab fa-twitter mx-2'> </i>
              <i className='fab fa-youtube mx-2'> </i>
            </li>

            {
              props.userData ? <>

                <li className="nav-item ">
                  <span onClick={props.logOut} className="nav-link" >LogOut</span>
                </li>
              </> :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">Regiester</Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="login">Login</Link>
                  </li>
                </>
            }

          </ul>

        </div>
      </nav>
    </div>
  )
}
