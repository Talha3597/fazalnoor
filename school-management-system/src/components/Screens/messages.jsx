import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button,Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const SendMessage =  ()=> {
   // const [message, setMessage]=useState("")
    const [ to, setTo ] = useState('')
   
    const [text,setText]= useState('')
    const [role,setRole]= useState('')
    const [Class,setClass]= useState('')
    const [section,setSection]= useState('')
    const [gdata,setData]=useState([])
    const [ classData, setClassData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    const removeData = async(id) => {
       
                const del = gdata.filter(gdata => id !== gdata._id)
                setData(del)
           
    }
   useEffect(async() => {
    axios.get('http://localhost:5000/api/getClasses')
        .then((res) => {
           
            setClassData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

        axios.get('http://localhost:5000/api/getSections')
        .then((res) => {
            
            setSectionData(res.data)
            
        })
        .catch(err => {
            console.log(err)
        })
       if(role=='Users')
       {
        
            await axios.get('http://localhost:5000/api/auth/usersData')
            .then(res=>{
              
                setData(res.data)
                
            })
           
       }
       
        
}, [role])

 
   
   
    const onSubmit = async(e) => {
       
        e.preventDefault()
        const{data}=await axios.post('http://localhost:5000/api/addMessage',{to,text,Class,section,gdata,role})
        alert(data.token)
        window.location='/messages' 

    }

    return (
        <>

       
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Message</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                 
                                <form className={styles.formMargin} onSubmit={onSubmit} enctype="multi-part/form-data">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="sAdmin"  value={role} onClick={() => setRole('Users')}/>
                                    <label class="form-check-label" for="sAdmin">
                                      All Users
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('Students')}/>
                                    <label class="form-check-label" for="sAdmin">
                                      All  Students
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('Selected')}/>
                                    <label class="form-check-label" for="sAdmin">
                                       Class Section
                                    </label>
                                    </div>
                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option selected>Select Class</option>
                                            {   
                                                 classData.map((classIns) => {
                                                     return <option 
                                                        key={classIns.title}
                                                        value={classIns.title}>
                                                            {classIns.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Section</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={section} onChange={ e => setSection(e.target.value) } required >
                                        <option selected>Select Section</option>
                                            {
                                                 sectionData.map((section) => {
                                                     return <option 
                                                        key={section.title}
                                                        value={section.title}>
                                                            {section.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>      
                               
                                <Form.Group controlId="formBasicMessage">
                                       
                                       <Form.Label>To</Form.Label>
                                       <Form.Control  className={styles.formField} type="Number" placeholder="0311 1111111" value={to} onChange={ e => setTo(e.target.value) }  />
                                   </Form.Group>
                                    <Form.Group controlId="formBasicMessage">
                                        <Form.Label>Text</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Enter Text" value={text} onChange={ e => setText(e.target.value) } required />
                                    </Form.Group>
                                    <Button className={styles.formButton} type="submit">
                                        
                                        Send
                                    </Button>
                                    <div className='table-responsive'>
      {  role=="Users"? <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th> Name</th>
      
      <th>Number</th>
     
      
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.username}</td> 
                            <td>{item.phoneNo}</td>  
                            <Button className={styles.sideButton2} onClick={() => removeData(item._id)}   >
                            remove</Button>
                        </tr>  
                    })}  
    
  </tbody>
</Table>:''}
       </div>
 
                                </form>
                                
                                <br/>
                            </div>
                            
                        </div>
                    </Col>

                </Row>
            </div>
        
        
        

        
        </>
    )
}

export default SendMessage