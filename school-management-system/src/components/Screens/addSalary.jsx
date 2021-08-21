import React, { useState } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
const AddSalary =  ({history})=> {
   // const [message, setMessage]=useState("")
   
    const [ employeeNo, setEmployeeNo] = useState('')
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState("")
   
    const createdBy=localStorage.getItem("username")
    const onSubmit = async() => {
       await axios.post('http://localhost:5000/api/addSalary',{employeeNo,title,amount,createdBy})
       history.push(`/salaries`)
       history.push(`/addSalary`)
}

return (
 <>

    
     <div className={styles.margLeftRow}>
         <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1> Generate Salary </h1>
                 </div>
                 
                 <div className={styles.formStyle}>
                     <div className={styles.Border}>
                         <br/>
                          
                         <form className={styles.formMargin} onSubmit={onSubmit} >
                         <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                        </Form.Group>
                                      <br/>
                                   
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Employee Number (Generate Fee for this Number Only)</Form.Label>
                        <Form.Control required className={styles.formField} type="number" placeholder="Enter Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } />
                    </Form.Group> 
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount *</Form.Label>
                        <Form.Control className={styles.formField} type="number" placeholder="Enter Amount" value={amount} onChange={ e => setAmount(e.target.value) } required/>
                    </Form.Group>
                   
                    
                    
                    <Button className={styles.formButton} type="submit">
                                        
                                        Generate Salary
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
export default AddSalary