import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AuthImage from '../assets/image4.jpeg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';
// both login and registration page

function Auth({ register }) {
  const{isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  const navigate =  useNavigate();
  const registerForm = register ? true : false;
  const [userData,setUserData]=useState({
    username:"",
    email:"",
    password:""
  })
  const handleRegister = async (e)=>{
    e.preventDefault();
    console.log("user ddetails====");
    console.log(userData);
    const{ username,email,password}=userData;
    if(!username || !email || !password){
      alert("please fill the form completely")
    }
    else{
      const result = await registerAPI(userData);
      console.log("===user registration result===");
      console.log(result);
      if (result.status === 200){
        alert("user registered successfully")
        setUserData({
          username:"",
          email:"",
          password:""

        })
      }
      else{
        alert(result.response.data)
        setUserData({
          username:"",
          email:"",
          password:""

        })
      }
      // if(result.status=== 406){
      //   alert("user already registered")

      // }
    }
  }
  const handlelogin = async(e)=>{
    e.preventDefault()
    const {email,password}=userData;
    if(!email|| !password){
      alert("please fill the form completely")
    }
    else{
      const loginResult = await loginAPI(userData)
      if(loginResult.status == 200){
      //   alert("logged in successfully")
      // console.log("=====loginresult=======");
      // console.log(loginResult.data);
      sessionStorage.setItem("existingUser",JSON.stringify(loginResult.data.existingUser))
      sessionStorage.setItem("token",loginResult.data.token)
      setIsAuthToken(true)
      navigate('/')
      }
      else{
        alert(loginResult.response.data)
      }
      

    }
  }
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: '100vh' }}>
        <div className='container w-75'>
          <Link to={'/'} style={{ textDecoration: "none", color: "blue" }}><i class="fa-solid fa-arrow-left me-3"></i>
            Back to Home
          </Link>
          <div className='bg-success p-5 rounded mt-3'>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6'>
                <img src={AuthImage} alt="" width={"100%"} />

              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='d-flex align-items-center flex-column'>
                  <h3> <i class="fa-brands fa-stack-overflow me-3"></i>project fair</h3>
                  <h5 className='text-light mt-3'>
                    {
                      registerForm ? "signup Your Account" : "signin your Account"
                    }
                    <Form>
                      {
                        registerForm &&
                      
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="User Name" onChange={(e)=>setUserData({...userData,username:e.target.value})}  value={userData.username}/>
                        
                      </Form.Group>
                      
                        }
                        
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setUserData({...userData,email:e.target.value})}  value={userData.email} />
                        
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setUserData({...userData,password:e.target.value})}  value={userData.password} />
                      </Form.Group>
                     {
                      registerForm ?
                      <div>
                        <button className='btn btn-warning round mt-3' onClick={handleRegister}>
                          Register

                        </button>
                        <p>Already A User? Click here to <Link to={'/login'} style={{color:"blue"}}>Login</Link></p>
                      </div>:
                      <div>
                        <Link to={'/Dashboard'}>
                        <button className='btn btn-warning round mt-3'onClick={handlelogin}>
                          Login


                        </button>
                        </Link>
                        <p>New  User? Click here to <Link to={'/register'} style={{color:"blue"}}>Register</Link></p>

                      </div>

                      
                     }
                    
                    </Form>
                  </h5>

                </div>

              </div>


            </div>

          </div>

        </div>
      </div>

    </>

  )
}

export default Auth