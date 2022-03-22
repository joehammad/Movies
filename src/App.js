import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import { Route, Routes,useNavigate ,Navigate} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Movies from './Movies/Movies';
import Network from './Network/Network';
import MovieDetails from './MovieDetails/MovieDetails';
import About from './About/About';
import jwtDecode from 'jwt-decode';



function App() {
  const [userData, setUserData] = useState(null)

  let navigate = useNavigate();
  useEffect(()=> {
    if(localStorage.getItem('userToken'))
    {
      getUserData();

    }
  }, [] )
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }
  function getUserData ()
  {
   let token= jwtDecode(localStorage.getItem('userToken')); 
   setUserData(token);
  }

  function ProtectedRoute({children}){
    if (!localStorage.getItem('userToken')){
    return <Navigate to='/login' />
    }
    else
    {
      return children;
    }
  }

  return (<>
  <Navbar userData={userData} logOut={logOut} />
  <div className='container'>
  <Routes>
  <Route path='/' element={<Register/>}/>
    <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute> }/>
    <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute> }/>
    <Route path='network' element={<ProtectedRoute><Network/></ProtectedRoute> }/>
    <Route path='about' element={<ProtectedRoute><About/></ProtectedRoute> }/>
    <Route path='MovieDetails' element={<MovieDetails/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path='login' element={<Login getUserData={getUserData} />}/>
    <Route path='*' element={<h2>404</h2>}/>
  </Routes>
  </div>



  </>
  );
}

export default App;
