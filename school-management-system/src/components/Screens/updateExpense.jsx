import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const UpdateExpense =  ({match,history})=> {
    const id=match.params.id
    const [ ExpenseCategory, setExpenseCategory ] = useState('')
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState("")
    
    const createdBy=localStorage.getItem("username")
    const [note, setNote]=useState("")
    const [message, setMessage]=useState("")
    
   useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/Expense' ,{ params: {id} })
        .then(res=>{
            
            setTitle(res.data.title)
            setAmount(res.data.amount)
            setExpenseCategory(res.data.ExpenseCategory)
          
            setNote(res.data.note)
            
        })
       }
       
 fetchData()
 

},[id]
)   

    const onSubmit = async() => {
       
          
        await axios.put(`/api/updateExpense/${id}`,{id,title,ExpenseCategory,amount,note,createdBy})
        setTimeout(()=>{
            setMessage("")
            history.push(`/updateExpense/${id}`)
            
            },4000)
           return setMessage("Expense Updated")
    }

    return (
        <>

      
     <div className={styles.margLeftRow}>
        <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1>Update Expense </h1>
                 </div>
                 
                 <div className={styles.formStyle}>
                     <div className={styles.Border}>
    {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                         
                         <form className={styles.formMargin} onSubmit={onSubmit} enctype="multi-part/form-data">
                         <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Expense Category</Form.Label>
                            <Form.Control className={styles.formField} type="text" placeholder="Enter Category" value={ExpenseCategory} onChange={ e => setExpenseCategory(e.target.value) } />
                        </Form.Group>   
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control className={styles.formField} type="number" placeholder="Enter Amount" value={amount} onChange={ e => setAmount(e.target.value) } required/>
                    </Form.Group>
                   
                   
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Note</Form.Label>
                        <Form.Control className={styles.formField} as="textarea" placeholder="Enter Note" value={note} onChange={ e => setNote(e.target.value) } />
                    </Form.Group>
                    <Button className={styles.formButton} type="submit">
                                        
                                        Update Expense
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

export default UpdateExpense