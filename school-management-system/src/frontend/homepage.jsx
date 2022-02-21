import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Image,} from 'react-bootstrap'
import { Link,} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import axios from 'axios'
const HomePage =  ()=> {
  const [principalMessage,setPrincipalMessage]=useState('')
  const [mission,setMission]=useState('')
  const [schoolName,setSchoolName]=useState('')
  const [address,setAddress]=useState('')
  const [phoneNo,setPhoneNo]=useState('')
  const [email,setEmail]=useState('')
  const [facebook,setFacebook]=useState('')
  const [whatsapp,setWhatsapp]=useState('')
  const [map,setMap]=useState('')
 
  useEffect(()=>{
    axios.get('/api/getSchoolInfo')
    .then((res) => {
       
        setPrincipalMessage(res.data[0].principalMessage)
        setMission(res.data[0].mission)
        setSchoolName(res.data[0].schoolName)
        setAddress(res.data[0].address)
        setPhoneNo(res.data[0].phoneNo)
        setEmail(res.data[0].email)
        setWhatsapp(res.data[0].whatsapp)
        setFacebook(res.data[0].facebook)
        setMap(res.data[0].map)
        

    })
    .catch(err => {
        console.log(err)
    })
   
  },[])

      return (
        
        <>

<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <div className='fakeimg1' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
         
     &nbsp;  &nbsp; <Navbar.Brand>{schoolName}</Navbar.Brand>
 
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
   
    
    <div className='box1'  > <h2>Principal's Messge</h2><h4>{principalMessage} 
    </h4></div>
    
   
   <div className='box2' ><h2>Our Mission</h2><h5>{mission}</h5></div>
    
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
<FaIcons.FaLocationArrow></FaIcons.FaLocationArrow>{address} &nbsp;
<br/><br/><a href={email}><FaIcons.FaMailBulk style={{color:'whitesmoke'}}/>&nbsp;{email}</a>
 
<br/><br/> <FaIcons.FaPhone/> &nbsp;{phoneNo} 
  <br/><br/>
&nbsp;&nbsp;<a href ={facebook}> <FaIcons.FaFacebookF style={{fontSize:75}}/></a>
&nbsp;&nbsp;<a href ={whatsapp}> <FaIcons.FaWhatsappSquare style={{color:'greenyellow',fontSize:75}}  /></a>
</div>

<div className='box4'> 
    <iframe   height='200' title='map' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={map}></iframe>
    </div>
    
    </div>
    </>
   )
   
   }    
   export default HomePage