import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const AddHomework =  ({history})=> {
   // const [message, setMessage]=useState("")
   const [ classData, setClassData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    const [error, setError]=useState("")
    const [ notice, setNotice ] = useState('')
    const [ url, setUrl ] = useState('')
    const [title,setTitle]= useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
   const [ status, setStatus ] = useState('')
   const [message, setMessage]=useState("")
   
   useEffect(()=>{
    if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
    {  
        window.location="/login"
    }
},[])
  
   useEffect(() => {
    axios.get('/api/getClasses')
        .then((res) => {
           
            setClassData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

        axios.get('/api/getSections')
        .then((res) => {
            
            setSectionData(res.data)
            
        })
        .catch(err => {
            console.log(err)
        })

        
}, [])

    const onSubmit = async(e) => {
        e.preventDefault()
        if(Class==''|| section=='')
        {
            
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError(" Select Class and Section");
                  
        }
          
             
               const{data} =await axios.post('/api/addHomework',{notice,url,Class,section,status,title})
            setTimeout(()=>{
                setMessage("")
                history.push('/homeworks')
                history.push('/addHomework')
                
                },4000)
               return setMessage(data.token)
    }

    return (
        <>

        
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Add Homework</h1>
                        </div>
                        
                        <div className={styles.formStyle}>           
                            <div className={styles.Border}>
                            {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                         <br/>
                                <form className={styles.formMargin} onSubmit={onSubmit}>
                                {error && <span className='error-message'>{error}</span>}             
                                 
                                <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option defaultValue>Select Class</option>
                                            {   
                                                 classData.map((classIns,idx) => {
                                                     return <option 
                                                        key={classIns._id}
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
                                        <option defaultValue>Select Section</option>
                                            {
                                                 sectionData.map((section,idx) => {
                                                     return <option 
                                                        key={section._id}
                                                        value={section.title}>
                                                            {section.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>      
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Homework</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea"  rows="10" placeholder="Enter work" value={notice} onChange={ e => setNotice(e.target.value) } required />
                                    </Form.Group>
                                    
                                     <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Url</Form.Label>
                                        <Form.Control className={styles.formField} type="url" placeholder="Enter url " value={url} onChange={ e => setUrl(e.target.value) }/>
                                    </Form.Group>
                                    
                                   <div className="form-check">
                                    <input className="form-check-input" type="radio"  id="active" checked={status === 'active'} value="active" onClick={() => setStatus('active')}/>
                                    <label className="form-check-label" for="active">
                                        Active
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio"  id="inactive" checked={status === 'inactive'} value="inactive" onClick={() => setStatus('inactive')}/>
                                    <label className="form-check-label" for="inactive">
                                        Inactive
                                    </label>
                                    </div>
                                    <Button className={styles.formButton} type="submit">
                                        
                                        Add Homework
                                    </Button>
                                    
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

export default AddHomework