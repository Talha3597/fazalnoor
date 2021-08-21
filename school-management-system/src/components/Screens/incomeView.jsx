import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,  Button,Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';
const ViewIncome =  ({match})=> {
    const id=match.params.id
    const [ incomeCategory, setIncomeCategory ] = useState('')
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
    async function fetchData(){   
        await axios.get('http://localhost:5000/api/income' ,{ params: {id} })
        .then(res=>{
            
            setTitle(res.data.title)
            setAmount(res.data.amount)
            setIncomeCategory(res.data.incomeCategory)
            setInvoiceNo(res.data.invoiceNo)
            setNote(res.data.note)
            setRecievedBy(res.data.receivedBy)
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
                     <h1> Income Slip </h1>
</div>                              
<div ref={componentRef} >
                 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Income Slip</h3>
                 </div>
                 
                 <div className={styles.formStyle}>
                     
                         <br/>
                         
                        
                        
                       <br/>
                       
                       &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <h3>Title :&nbsp;{title}</h3>
                       <div className={styles.tableMargin }>
    
  
                       <Table  bordered  size='lg'>
  <tbody>
 <tr ><td>Amount : </td><td>{amount}</td></tr>
  <tr><td>Income Category :</td><td>{incomeCategory}</td> </tr> 
  <tr><td>Invoice Number :</td><td>{invoiceNo}</td> </tr> 
 <tr><td> Date :</td><td>{date}</td></tr>
  <tr><td>Recieved By :</td><td>{recievedBy}</td></tr>
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

export default ViewIncome