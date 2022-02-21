import React, { useState ,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from 'axios'

const AddIncome =  ({})=> {
    var [today,setToday] =useState( new Date())

     var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
const [ incomeCategory, setIncomeCategory ] = useState('')
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState(0)
    const [note, setNote]=useState("")
    const receivedBy=localStorage.getItem("username")
    const [message, setMessage]=useState('')
    const [error, setError]=useState('')
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
        const config= {
            headers:{
                
                Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                role:localStorage.getItem("role")
            }
       }
        const fetchPrivateData=async()=>
        {
           
           try {
            const {data}=  (await axios.get('/api/private',config))
            console.log(data.data)
    
                 
            } catch (error) {
                localStorage.removeItem("authToken")
                localStorage.removeItem("role")
                window.location="/login"
            }
        }
        
        fetchPrivateData()
        
    },[])
    const spaceClean=()=>{
        setAmount(0)
        setIncomeCategory('')
        setMessage('')
        setNote('')
        setTitle('')
        setToday(new Date())
    }
    const onSubmit = async(e) => {
        e.preventDefault()
        if(amount<=0){
            setTimeout(()=>{
                setError('')
            },4000)
              return setError("Enter payable amount ")
   
        }
        await axios.post('/api/addIncome',{incomeCategory,title,amount,note,date,receivedBy})
        setTimeout(()=>{
             spaceClean()            
            },4000)
           return setMessage("Income Added")

}

return (
 <>

      
     <div className={styles.margLeftRow}>
        <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1>Add Income </h1>
                 </div>
                 
                 <div className={styles.formStyle}>             
                    
                     <div className={styles.Border}>
                     {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                     {error && <Button  className={styles.sideButton5} autoFocus >{error}</Button>}             
                         <br/>
                         <form className={styles.formMargin} onSubmit={onSubmit} enctype="multi-part/form-data">
                         <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Income Category</Form.Label>
                            <Form.Control className={styles.formField} type="text" placeholder="Enter Category" value={incomeCategory} onChange={ e => setIncomeCategory(e.target.value) } />
                        </Form.Group>   
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Amount</Form.Label>
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
                
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Note</Form.Label>
                        <Form.Control className={styles.formField} as="textarea" placeholder="Enter Note" value={note} onChange={ e => setNote(e.target.value) } />
                    </Form.Group>
                    <Button className={styles.formButton} type="submit">
                                        
                                        Add Income
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
export default AddIncome