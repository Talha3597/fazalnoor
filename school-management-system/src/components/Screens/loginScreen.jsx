import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Navbar, Nav, Container, Image} from 'react-bootstrap'
import styles from '../../assets/home.css'
import * as FaIcons from 'react-icons/fa';
import '../../assets/screen.css'

const LoginScreen =({history})=>{
    
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [error, setError]=useState("")
    useEffect(()=>{
        if(localStorage.getItem('authToken'))
        {
            window.location='/'
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
                
                if(data.role =='teacher'||data.role =='adminTeacher'||data.role =='financeTeacher')
                {
                localStorage.setItem("role",data.role)
                localStorage.setItem("username",data.username)
                localStorage.setItem("Class",data.Class)
                localStorage.setItem("section",data.section)
                localStorage.setItem("id",data.id)
                   window.location='/'
                }
                else{
                localStorage.setItem("role",data.role)
                localStorage.setItem("username",data.username)
                localStorage.setItem("id",data.id)
                window.location='/'
                }}
                
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
              <Link to='/noticeB'>
                
                <FaIcons.FaClipboardCheck  /> Notices
               
              </Link>
              <Link to='/home'>
                
                <FaIcons.FaHome  /> Home
               
              </Link>
                <Link to='/login'>
                 
                  <FaIcons.FaSignInAlt/>  Sign In
                  
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