import React, { useState } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import  Sidebar  from './privateScreen';
const AddIncomeCategories =  ()=> {
   // const [message, setMessage]=useState("")
    const [ incomeCategories, setIncomeCategories ] = useState('')
    
    const onSubmit = async() => {
        await axios.post('http://localhost:5000/api/addIncomeCategory',{incomeCategories})
        

}

return (
 <>


     <div className={styles.margLeftRow}>
         <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1>Income Categories</h1>
                 </div>
                 
                 <div className={styles.formStyle}>
                     <div className={styles.Border}>
                         <br/>
                          
                         <form className={styles.formMargin} onSubmit={onSubmit} enctype="multi-part/form-data">
                         <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Income Category</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Category" value={incomeCategories} onChange={ e => setIncomeCategories(e.target.value) } required />
                                    </Form.Group>
                         <Button className={styles.formButton} type="submit">
                                        
                                        Add New Category
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
export default AddIncomeCategories