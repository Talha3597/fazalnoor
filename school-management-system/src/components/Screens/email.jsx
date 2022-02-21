import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const SendEmail =  ()=> {
   // const [message, setMessage]=useState("")
    const [ to, setTo ] = useState('')
    const [ subject, setSubject ] = useState('')
    const [ cc, setCc ] = useState('')
    const [ bcc, setBcc ] = useState('')
   
    const [text,setText]= useState('')
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
   
   
    const onSubmit = async() => {
       
               await axios.post('/api/sendEmail',{to,cc,bcc,subject,text})


    }

    return (
        <>

       
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Email</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                 
                                <form className={styles.formMargin} onSubmit={onSubmit} enctype="multi-part/form-data">
                                <Form.Group controlId="formBasicEmail">
                                       
                                       <Form.Label>To</Form.Label>
                                       <Form.Control required className={styles.formField} type="email" placeholder="sample@gmail.com" value={to} onChange={ e => setTo(e.target.value) }  />
                                   </Form.Group>
                                   <Form.Group controlId="formBasicEmail">
                                       
                                       <Form.Label>cc</Form.Label>
                                       <Form.Control className={styles.formField} type="email" placeholder="cc" value={cc} onChange={ e => setCc(e.target.value) }  />
                                   </Form.Group>
                                   <Form.Group controlId="formBasicEmail">
                                       
                                       <Form.Label>bcc</Form.Label>
                                       <Form.Control className={styles.formField} type="email" placeholder="bcc" value={bcc} onChange={ e => setBcc(e.target.value) }  />
                                   </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                       
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Subject" value={subject} onChange={ e => setSubject(e.target.value) }  />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Text</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Enter Text" value={text} onChange={ e => setText(e.target.value) } required />
                                    </Form.Group>
                                    
                                    <Button className={styles.formButton} type="submit">
                                        
                                        Send
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

export default SendEmail