import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const EmailSetting =  (history)=> {
    
    const [service,setService]= useState('')
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [message, setMessage]=useState('')
    const [id, setId]=useState('')
    const [emailData, setEmailData]=useState([])
    
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
  
   useEffect(() => {
    axios.get('/api/getEmail')
    .then((res) => {
       
        setEmailData(res.data)
        setService(res.data[0].service)
        setUsername(res.data[0].username)
        setId(res.data[0]._id)
    })
    .catch(err => {
        console.log(err)
    })
        
}, [])

const removeData=()=>{
    let flag= window.confirm("Delete Email Setting!")
    if(flag)
    { 
       axios.delete(`/api/deleteEmail`, { params: {id} }) 
      window.location='emailSetting'
          }
  }
    const onSubmit = async(e) => { 
        e.preventDefault()    
            const{data} =await axios.post('/api/addEmail',{service,username,password})
          
            setTimeout(()=>{
                setMessage("") 
             window.location='/emailSetting'
                },4000)
               return setMessage("Email Added")

    }

    return (
        <>

        
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Email Setting</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
               

                            <div className={styles.Border}>
                            {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                         <br/>{!emailData[0]?
                                <form className={styles.formMargin} onSubmit={onSubmit}>
                                 
                               
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email service  (e.g gmail,hotmail...)</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter email service provider" value={service} onChange={ e => setService(e.target.value) } required />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>ID(abc@abc.com)</Form.Label>
                                    <Form.Control className={styles.formField} type="email" placeholder="abc@abc.com" value={username} onChange={ e => setUsername(e.target.value) } required />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className={styles.formField} type="password" placeholder="Enter password" value={password} onChange={ e => setPassword(e.target.value) } required />
                                </Form.Group>
                                  
                                        <Button className={styles.formButton} type="submit">
                                        
                                         Set Email
                                    </Button>
                                    <br/>
                                            
                                </form>
                               :  (<form className={styles.formMargin} >
                                 
                               
                               <Form.Group controlId="formBasicEmail">
                                   <Form.Label>Email service  (e.g gmail,hotmail...)</Form.Label>
                                   <Form.Control className={styles.formField} type="text" placeholder="Enter email service provider" value={service} onChange={ e => setService(e.target.value) } required />
                           </Form.Group>
                           <Form.Group controlId="formBasicEmail">
                               <Form.Label>ID(abc@abc.com)</Form.Label>
                               <Form.Control className={styles.formField} type="email" placeholder="abc@abc.com" value={username} onChange={ e => setUsername(e.target.value) } required />
                           </Form.Group>
                           
                             
                             <Button className={styles.formButton} onClick={() => removeData()}>
                                   
                                    Delete
                               </Button>
                               <br/>
                                       
                           </form>)}
                            </div>
                            
                        </div>
                    </Col>

                </Row>
            </div>
        
        
        

        
        </>
    )
}

export default EmailSetting