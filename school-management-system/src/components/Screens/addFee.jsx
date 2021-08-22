import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const AddFee =  ()=> {
   // const [message, setMessage]=useState("")
   const [ classData, setClassData ] = useState([])
   const [ sectionData, setSectionData ] = useState([])
   const [error, setError]=useState("")
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ studentNo, setStudentNo] = useState('')
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState("")
    const [invoiceNo, setInvoiceNo]=useState("")
    const createdBy=localStorage.getItem("username")
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
      const{data}= await axios.post('/api/addFee',{Class,section,studentNo,title,amount,invoiceNo,createdBy})
      alert(data.token)
       window.location='/addFee'
}

return (
 <>

    
     <div className={styles.margLeftRow}>
         <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1> Generate Fee </h1>
                 </div>
                 
                 <div className={styles.formStyle}>
                     <div className={styles.Border}>
                         <br/>
                          
                         <form className={styles.formMargin} onSubmit={onSubmit} >
                         {error && <span className='error-message'>{error}</span>} 
                         <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required ></Form.Control>
                                        
                        </Form.Group>
                        <Form.Control required className={styles.formField} as="select" value={title} onChange={ e => setTitle(e.target.value) } >
                        <option defaultValue>Select Fee Types as title </option>                  
                        <option value='Fine'>Fine</option>    
                        </Form.Control>       
                                <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option defaultValue>Select Class (Generate Fee For Whole Class)</option>
                                            {   
                                                 classData.map((classIns) => {
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
                                        <option defaultValue>Select Section (Generate Fee for Whole Section)</option>
                                            {  
                                                 sectionData.map((section) => {
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
                        <Form.Label>Student Number (Generate Fee for this Number Only)</Form.Label>
                        <Form.Control className={styles.formField} type="number" placeholder="Enter Student Number" value={studentNo} onChange={ e => setStudentNo(e.target.value) } />
                    </Form.Group> 
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount *</Form.Label>
                        <Form.Control className={styles.formField} type="number" placeholder="Enter Amount" value={amount} onChange={ e => setAmount(e.target.value) } required/>
                    </Form.Group>
                   
                
                    
                    <Button className={styles.formButton} type="submit">
                                        
                                        Generate Fee
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
export default AddFee