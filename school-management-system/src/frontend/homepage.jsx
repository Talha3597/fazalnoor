import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../assets/home.css'
import { Navbar, Nav, Container, Image,Row,Col} from 'react-bootstrap'
import { Link,useHistory} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';

const HomePage =  ({history})=> {
  
useEffect(()=>{
  history.push('/blank')
  history.push('/home')
  
},[])
      return (
        
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
               
              </Link><Link to='/noticeB'>
                
                <FaIcons.FaClipboardCheck  /> Notices
               
              </Link>
             
                <Link to='/login'>
                 
                  <FaIcons.FaSignInAlt/> Sign In
                  
                </Link>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   

<div className='empty'></div>

  <div className='container1'>
   
    
    <div className='box1'  > <h2>Principal's Messge</h2><h4>In life, no one and nothing will help you until you start helping yourself. 
    </h4></div>
    
   
   <div className='box2' ><h2>Our Mission</h2><h5>Our mission is to develop well rounded, confident and responsible individuals who aspire to achieve their full potential. We will do this by providing a welcoming, happy, safe, and supportive learning environment in which everyone is equal and all achievements are celebrated.</h5></div>
    
  </div>
  <div className='container1'>
    <div className="box1"><h5>Why us?</h5>
    <div className='fakeimg2' ><FaIcons.FaBookReader style={{fontSize:100}}/><h5>Certified Team</h5></div><br/>
    <div className='fakeimg2' ><FaIcons.FaCalendarCheck style={{fontSize:100}}/><h5>Professional Conduct</h5></div><br/>
    <div className='fakeimg2'><FaIcons.FaMicroscope style={{fontSize:100}}/><h5>Research Labs</h5></div><br/>
    <div className='fakeimg2'><FaIcons.FaFootballBall style={{fontSize:100}}/><h5>Sports</h5></div></div>
    <div className="box2">
    <h1>A Quality School..</h1>
    <strong><em>Faculty prepare high-quality teachers and school leaders to teach and lead across curricula, age spans and diverse learning environments.</em></strong>
    <hr/>
    <h3>Essential Policies </h3>
    <div classNameNmae='fakeimg' style={{height:300}}>
    <h5>Attendance Policy</h5>
    <h5>Bullying Policy</h5>
    <h5>Cell Phone Policy</h5>
    <h5>Dress Code Policy</h5>
    <h5>Fighting Policy</h5>
    <h5>Respect Policy</h5>
    <h5>Student Code of Conduct</h5>
    <h5>Student Discipline</h5>
    <h5>Student Search and Seizure Policy</h5></div>
    <div className='fakeing3' >
    <Image className="image" src='/images/board.jpeg' alt='Fazal Noor School'  />
    </div>
    </div>
     </div>

<div className='empty'/>
<div className='container1' style={{color:'whitesmoke'}}>
<div className='box3'>
<FaIcons.FaLocationArrow></FaIcons.FaLocationArrow>Al Khidmat Schools Fazal Noor Campus opposite Choti Phataki Kot Lakhpat lahore &nbsp;
<br/><br/><a href="Fnoorschool@gmial.com"><FaIcons.FaMailBulk style={{color:'whitesmoke'}}/>&nbsp;Fnoorschool@gmial.com</a>
 
<br/><br/> <FaIcons.FaPhone/> &nbsp;0333-4321242 / 0310-4091041 
  <br/><br/>
&nbsp;&nbsp;<a href ="https://www.facebook.com/FazalNoorCampus/"> <FaIcons.FaFacebookF style={{fontSize:75}}/></a>
&nbsp;&nbsp;<a href ="https://api.whatsapp.com/send?phone=923104091041&app=facebook&entry_point=page_cta"> <FaIcons.FaWhatsappSquare style={{color:'greenyellow',fontSize:75}}  /></a>
</div>

<div className='box4'> 
    <iframe   height='200' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.1513742329166!2d74.33696261462947!3d31.465021857022304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190747b150cbd3%3A0xf8e73d43ea4f50a1!2sAl%20Khidmat%20School!5e0!3m2!1sen!2s!4v1628706655322!5m2!1sen!2s"></iframe>
    </div>
    
    </div>
    </>
   )
   
   }    
   export default HomePage