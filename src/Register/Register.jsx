import React, { useState } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();
  const [errorList, seterrorList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState('')

  const [user, setuser] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",



  })
  function checkValidation(user) {
    let schema = Joi.object(
      {
        first_name: Joi.string()
          .alphanum()
          .min(4)
          .max(10)
          .required(),
        last_name: Joi.string()
          .alphanum()
          .min(4)
          .max(10)
          .required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

      });
    return schema.validate(user, { abortEarly: false })
  }

  function getUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setuser(myUser)

  }
  async function submitRegister(e) {

    e.preventDefault();
    setIsLoading(true);
    let validateResults = checkValidation(user);
    console.log(validateResults)

    if (validateResults.error) {
      setIsLoading(false)
      seterrorList(validateResults.error.details)
    }
    else {

      let { data } = await axios.post(`https://routeegypt.herokuapp.com/signup`, user)
      if (data.message == 'success') {
        navigate('/login')
        setIsLoading(false)
      }
      else {
        console.log(data)
        setError(data.message)
        setIsLoading(false)
      }
    }


  }
  return (
    <>
      <form onSubmit={submitRegister} className='w-75 m-auto mt-5'>
        {errorList.map((error, index) => {
          if (index === 4)
          {
            <div key={index} className="alert-danger alert ">password invaild</div>
          }
          else {
            return <div key={index} className="alert-danger alert ">{error.message}</div>
          }
          
        }

        )}
        {error ? <div className="alert-danger alert ">{error}</div> : ''}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input onChange={getUser} type="text" className="form-control mb-4" id="firstName" placeholder="Enter Your First Name" name='first_name' />
          <label htmlFor="lastName">Last Name</label>
          <input onChange={getUser} type="text" className="form-control mb-4" id="lastName" placeholder="Enter Your Last Name" name='last_name' />
          <label htmlFor="Email">Email address</label>
          <input onChange={getUser} type="email" className="form-control mb-4" id="email" aria-describedby="emailHelp" placeholder="Enter Your Email" name='email' />

        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={getUser} type="password" className="form-control mb-4" id="Password" placeholder=" Password" name='password' />
        </div>

        <button type="submit" className="btn btn-outline-primary my-3">
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
        </button>
      </form>
    </>
  )
}
