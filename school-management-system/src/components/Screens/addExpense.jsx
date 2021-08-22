import React, { useState } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const AddExpense =  ({history})=> {
    var today = new Date()
   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
   
    const [ ExpenseCategory, setExpenseCategory ] = useState('')
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState("")
    const [note, setNote]=useState("")
    const createdBy=localStorage.getItem("username")
    const onSubmit = async() => {
        await axios.post('/api/addExpense',{ExpenseCategory,title,amount,note,createdBy})
        history.push('/expense')
        history.push('/addExpense')


}

return (
 <>

  
     <div className={styles.margLeftRow}>
            <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1>Add Expense </h1>
                 </div>
                 
                 <div className={styles.formStyle}>
                     <div className={styles.Border}>
                         <br/>
                         <div className="text-right">
                          <h5>{date}&nbsp;</h5></div> 
                         <form className={styles.formMargin} onSubmit={onSubmit} >
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
                                        
                                        Add Expense
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
export default AddExpense