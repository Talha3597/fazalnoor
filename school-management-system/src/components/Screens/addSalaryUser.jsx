import React, { useState } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from 'axios'


const AddSalary =  ({match,history})=> {
   // const [message, setMessage]=useState("")
   var [today,setToday] =useState( new Date)   
   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    const [ employeeNo, setEmployeeNo] = useState(match.params.id)
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState(0)
    const [message, setMessage]=useState('')
    const [error, setError]=useState('')
    const createdBy=localStorage.getItem("username")
    const spaceClean=()=>{
        setAmount(0)
        setTitle('')
        setMessage('')
    }
    const onSubmit = async(e) => {
            e.preventDefault()
        if(amount<=0)
        {
            
       setTimeout(()=>{
        setError('')
        
        },4000)
        return setError("Enter payable amount")
       
    }
            await axios.post('/api/addSalary',{employeeNo,title,amount,createdBy,date})

       setTimeout(()=>{
        
            spaceClean()        
        },4000)
       return setMessage("Salary Added")
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
                     {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
    {error && <Button  className={styles.sideButton5} autoFocus >{error}</Button>}             
                         <br/>
                          
                         <form className={styles.formMargin} onSubmit={onSubmit} >
                         <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                        </Form.Group>
                                      <br/>
                                   
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Employee Number </Form.Label>
                        <Form.Control required className={styles.formField} readOnly type="number" placeholder="Enter Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } />
                    </Form.Group> 
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount *</Form.Label>
                        <Form.Control className={styles.formField} type="number" placeholder="Enter Amount" value={amount} onChange={ e => setAmount(e.target.value) } required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Select Date:</Form.Label><br/>
                                            <DatePicker
                                                selected={today}
                                                onChange={date => setToday(date)}
                                          required
                                                 />
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