import React, { useState } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from 'axios'


const AddFee =  ({match,history})=> {
   // const [message, setMessage]=useState("")
   var [today,setToday] =useState( new Date)
   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
   
   const [error, setError]=useState('')
    const [ studentNo, setStudentNo] = useState(match.params.id)
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState(0)
    const createdBy=localStorage.getItem("username") 
    const [message, setMessage]=useState("")
const spaceFree=()=>{
    setAmount(0)
    setMessage('')
    setTitle('')
    setToday(new Date)
    
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
        const{data}= await axios.post('/api/addFee',{studentNo,title,amount,createdBy,date})
       setTimeout(()=>{
       spaceFree()
        },4000)
       return setMessage(data.token)
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
                     {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                     {error && <Button  className={styles.sideButton5} autoFocus >{error}</Button>}             
                         <br/>
                         <form className={styles.formMargin} onSubmit={onSubmit} >
                      
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
                   
                    <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Select Date:</Form.Label><br/>
                                            <DatePicker
                                                selected={today}
                                                onChange={date => setToday(date)}
                                          required
                                                 />
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