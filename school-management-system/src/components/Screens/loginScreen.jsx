import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Navbar, Nav, Container, Image} from 'react-bootstrap'
import styles from '../../assets/home.css'
import {BrowserRouter as Router, Route} from "react-router-dom"
import * as FaIcons from 'react-icons/fa';
import  App1  from '../Routing/superAdminRoute';

import '../../assets/screen.css'

const LoginScreen =({history})=>{
    
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [error, setError]=useState("")
    useEffect(()=>{
      if(localStorage.getItem("authToken") && localStorage.getItem("role"))
      {  
        const config= {
          headers:{
              
              Authorization:`Bearer ${localStorage.getItem("authToken")}`,
              role:localStorage.getItem("role")
          }
     }
      const fetchPrivateData=async()=>
      {
         
         try {
          const {data}=  (await axios.get('/api/private',config))
          history.push('/')
         
          } catch (error) {
              localStorage.removeItem("authToken")
              localStorage.removeItem("role")
              setError("You Are Not Authorized")
                setTimeout(()=>{
                setError("")
                },5000)
          }
      }
      
      fetchPrivateData()
      
      }
      
      
       
   },[history])

     const loginHandler=async(e)=>
    {
        e.preventDefault()
        const config ={
                header:{
                    "Content-Type":  "application/json"
                }
        }
            try {
                const {data}= await axios.post("/api/auth/login",{email,password},config)
                if(data.token){localStorage.setItem("authToken",data.token)
                if(data.role == 'superAdmin')
                {
                  localStorage.setItem("role",data.role)
                  localStorage.setItem("username",data.username)
                  localStorage.setItem("id",data.id)
                history.push('/adminDashboard')
                }
                else if(data.role == 'admin'){
                  localStorage.setItem("role",data.role)
                  localStorage.setItem("username",data.username)
                  localStorage.setItem("id",data.id)
                history.push('/classData')
                }
                else if(data.role == 'finance'){
                  localStorage.setItem("role",data.role)
                  localStorage.setItem("username",data.username)
                  localStorage.setItem("id",data.id)
                history.push('/fees')
                }
                else if(data.role == 'teacher'){
                  localStorage.setItem("role",data.role)
                  localStorage.setItem("username",data.username)
                  localStorage.setItem("id",data.id)
                  localStorage.setItem("Class",data.Class)
                localStorage.setItem("section",data.section)
                history.push(`/viewStudents/${data.section}`)
                }
                else if(data.role == 'adminFinance'){
                  localStorage.setItem("role",data.role)
                  localStorage.setItem("username",data.username)
                  localStorage.setItem("id",data.id)
                history.push(`/classData`)
                }
                else if(data.role == 'adminTeacher'){
                  localStorage.setItem("role",data.role)
                  localStorage.setItem("username",data.username)
                  localStorage.setItem("id",data.id)
                  localStorage.setItem("Class",data.Class)
                localStorage.setItem("section",data.section)
                history.push(`/classData`)
                }
                else if(data.role == 'financeTeacher'){
                  localStorage.setItem("role",data.role)
                  localStorage.setItem("username",data.username)
                  localStorage.setItem("id",data.id)
                  localStorage.setItem("Class",data.Class)
                localStorage.setItem("section",data.section)
                history.push(`/students`)
                }
                   
              }
                
            } catch (error) {
                setError("Incorrect email or password")
                setTimeout(()=>{
                setError("")
                },5000)
            }
        }
    
    return(
        <>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <div className='fakeimg1' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
         
     &nbsp;  &nbsp; <Navbar.Brand> Fazal Noor School System</Navbar.Brand>
 
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
            <Link to='/home'>
                
                <FaIcons.FaHome  /> Home
               
              </Link>
              <Link to='/noticeB'>
                
                <FaIcons.FaClipboardCheck  /> Notices
               
              </Link>
              
                <Link to='/login'>
                 
                  <FaIcons.FaSignInAlt/> Sign In
                  
                </Link>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        
        <div className='login-screen'>
           
            <form onSubmit={loginHandler} className='login-screen__form'>
                <h3 className='login-screen__title'>Login</h3>
                 {error && <span className='error-message'>{error}</span>}              
                <div className='form-group'>
                <label htmlFor="email">Email:</label>
                <input type='emial' required id='email' placeholder="Please Enter Email" value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                tabIndex={1}></input>
                </div> 
                <div className='form-group'>
                <label htmlFor="password">Password:
                <Link className='login-screen__forgotpassword'to='/forgotpassword' tabIndex={4}>Forgot Password?</Link>
                </label>
                <input type='password' required id='password' placeholder="Please Enter Pasword " value={password} 
                onChange={(e)=>setPassword(e.target.value)} tabIndex={2}></input>
                </div> 
                <button type='submit' className='btn btn-primary' tabIndex={3}>Login</button>
                
            </form>
            </div>
       
       </>
    )
}

export default LoginScreen