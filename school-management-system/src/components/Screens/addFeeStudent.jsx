import React, { useState } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const AddFee =  ({match})=> {
   // const [message, setMessage]=useState("")
   
   const [error, setError]=useState("")
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ studentNo, setStudentNo] = useState(match.params.id)
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState("")
    const [invoiceNo, setInvoiceNo]=useState("")
    const createdBy=localStorage.getItem("username") 
    const onSubmit = async(e) => {
        e.preventDefault()
      const{data}= await axios.post('/api/addFee',{Class,section,studentNo,title,amount,invoiceNo,createdBy})
      alert(data.token)
       window.location=`/addFeeStudent/${studentNo}`
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
                                           
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Student Number </Form.Label>
                        <Form.Control className={styles.formField}  readOnly type="number" placeholder="Enter Student Number" value={studentNo} onChange={ e => setStudentNo(e.target.value) } />
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