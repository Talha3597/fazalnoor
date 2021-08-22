import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../assets/home.css'
import { Navbar, Nav, Container, Image,Row,Col, ListGroup, ListGroupItem,Card} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';

import axios from 'axios'
const NoticeBoard = ()=>{
  const [data,setData] =useState([])
  useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/notices')
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()
 

},[]
)
return(<>

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
                 
                  <FaIcons.FaSignInAlt/>  Sign In
                  
                </Link>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   <Row>
     <Col md={12} className='p-4'>
       <Card >
         {
           data.map(
             item=>(item.status === 'public' &&(<ListGroup>
               <ListGroupItem><Card.Title>
                {item.title}
                </Card.Title>
                <Card.Text>
                  {item.notice}
                </Card.Text>
               </ListGroupItem>
             </ListGroup>))
           )
         }
       </Card>
     </Col>
   </Row>

</>)
}
export default NoticeBoard