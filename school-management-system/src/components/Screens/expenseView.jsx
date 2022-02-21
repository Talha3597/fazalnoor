import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,  Button,Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';
const ViewExpense =  ({match})=> {
    const id=match.params.id
    const [ expenseCategory, setExpenseCategory ] = useState('')
    const [title, setTitle]=useState("")
    const [amount, setAmount]=useState("")
   const [recievedBy ,setRecievedBy] = useState('')
   const [date, setDate] =useState('')
    const [invoiceNo, setInvoiceNo]=useState('')
    const [note, setNote]=useState("")
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
   useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/expense' ,{ params: {id} })
        .then(res=>{
            
            setTitle(res.data.title)
            setAmount(res.data.amount)
            setExpenseCategory(res.data.ExpenseCategory)
            setInvoiceNo(res.data.invoiceNo)
            setNote(res.data.note)
            setRecievedBy(res.data.createdBy)
            setDate(res.data.date)
        })
       }
       
 fetchData()
 

},[id]
)   

   

    return (
        <>

<div className={styles.margLeftRow}>
          <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1> Expense Slip </h1>
</div>                              
<div ref={componentRef} >
                 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Expense Slip</h3>
                 </div>
                 
                 <div className={styles.formStyle}>
                     
                         <br/>
                         
                        
                        
                       <br/>
                       
                       &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <h3>Title :&nbsp;{title}</h3>
                       <div className={styles.tableMargin }>
    
  
                       <Table  bordered  size='lg'>
  <tbody>
 <tr ><td>Amount : </td><td>{amount}</td></tr>
  <tr><td>Expense Category :</td><td>{expenseCategory}</td> </tr> 
  <tr><td>Invoice Number :</td><td>{invoiceNo}</td> </tr> 
 <tr><td> Date :</td><td>{date}</td></tr>
  <tr><td>Created By :</td><td>{recievedBy}</td></tr>
  <tr><td>Note :</td><td>{note}</td></tr>  

</tbody>
</Table>
</div> 
</div>             
</div>                              
                    <Button style={{marginLeft: '30%'}} onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print Now
                                       </Button>
                                    
                               
                                
                                <br/>
                           
                           
                        
                    </Col>

                </Row>
            </div>
        

       
        

        
        </>
    )                       
}

export default ViewExpense