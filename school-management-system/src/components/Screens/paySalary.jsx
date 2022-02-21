import React, { useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';


 
const PaySalary =  ( {match})=> {
   // const [message, setMessage]=useState("")
   var [today,setToday] =useState( new Date())
   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
 
     const id=match.params.id
     let due=0
    const [ employeeNo, setEmployeeNo] = useState('')
    const [ name, setName] = useState('')
    const [ salary, setSalary] = useState(0)
     const [title, setTitle]=useState('')
  
    const [pending, setPending]=useState('')
    const [date1, setDate1]=useState('')
    const [payAmount, setPayAmount]=useState('')
    const [invoiceNo, setInvoiceNo]=useState('')
    let  receivedBy=localStorage.getItem("username")
    let[gdata,setData] =useState([]) 
    let[gdata1,setData1] =useState([]) 
    const [error, setError]=useState('')
    const [message, setMessage]=useState('')
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });    
    due=salary-pending
    async function fetchDepositeData(){   
        await axios.get(`/api/salaryDeposite`,{ params: {invoiceNo} } )
        .then(res=>{
         setData1(res.data)
        })
     
       
     }
     useEffect(()=>{
        axios.get(`/api/salaryDeposite`,{ params: {invoiceNo} } )
        .then(res=>{
         setData1(res.data)
        })
     },[invoiceNo])
     async function fetchSalaryData(){   
        //let data
       await axios.get(`/api/salary`,{ params: {id} } )
       .then(res=>{
        setData(res.data)
       setEmployeeNo(res.data[0].employeeNo)
       setName(res.data[0].username) 
       setTitle(res.data[0].title) 
       setSalary(res.data[0].salary) 
       setPending(res.data[0].pending)
       setDate1(res.data[0].date) 
       setInvoiceNo(res.data[0].invoiceNo) 
          
    }
       )
      
    }
    useEffect(()=>{
       
         axios.get(`/api/salary`,{ params: {id} } )
        .then(res=>{
         setData(res.data)
        setEmployeeNo(res.data[0].employeeNo)
        setName(res.data[0].username) 
        setTitle(res.data[0].title) 
        setSalary(res.data[0].salary) 
        setPending(res.data[0].pending)
        setDate1(res.data[0].date) 
        setInvoiceNo(res.data[0].invoiceNo) 
           
     }
        )
       
    
    },[id]
    )
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])    
    const onSubmit = async(e) => {
        e.preventDefault()
        if(payAmount<=0){
            setTimeout(()=>{
                setError('')
                },4000)
               return setError("Enter payable amount")
                
        }
        if(payAmount>due){
            setTimeout(()=>{
                setError('')
                },4000)
               return setError("Entering extra amount")
                
        }

     const{data}=await axios.post('/api/paySalary',{id,name,employeeNo,title,salary,payAmount,pending,receivedBy,invoiceNo,date})
    setTimeout(()=>{
        setMessage('')
        setPayAmount('')
        fetchDepositeData()
        fetchSalaryData()
        setToday(new Date())
        },4000)
       return setMessage(data.message)
}

return (
 <>


     <div className={styles.margLeftRow}>
          <Row>
             <Col md={12}>
                 <div className={styles.backBar}>
                     <h1> Pay Salary </h1>
</div>                              
<div ref={componentRef} >
                 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Salary Slip</h3>
                     <div className='fakeimg4' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
                 
                 </div>
                 
                 <div className={styles.formStyle}>
    
              
                 <div className={styles.Border}>
                        {error && <Button  className={styles.sideButton5} autoFocus >{error}</Button>}  
                        {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}  
                        
                </div>           
                     
                         <br/>
                         
                         <form  onSubmit={onSubmit} >
                        
                         
                        <label> Employee Number : </label>&nbsp;{employeeNo}
                         &nbsp;&nbsp;&nbsp; <label>Name :</label>&nbsp;{name}
                        <br/>
        
                       <br/>
                       
                       &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <h3>Title :&nbsp;{title}</h3>
                       <div className={styles.tableMargin }>
                       <Table bordered  size='lg'>
  <tbody>
<tr > 
<td>    
                       <Table  bordered  size='sm'>
  <tbody>
  <tr ><td>Title</td><td>{title}</td></tr>
  <tr ><td>Invoice #</td><td>{invoiceNo}</td></tr>
 <tr ><td>Amount</td><td>{salary}</td></tr>
  <tr><td>Paid</td><td>{pending}</td> </tr> 
 <tr><td>Issue Date</td><td>{date1}</td></tr>
  <tr><td>Pending</td><td>{due}</td></tr>  
</tbody>
</Table>
</td>
<td>                  
     {gdata1[0]?  <Table  bordered  size='sm'>
  <thead>
    <tr>
      <th>Date</th>
      <th>Paid</th>
      <th>person</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {gdata1.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.date}</td> 
                            <td>{item.pending}</td>
                            <td>{item.person}</td>
                            <td>{item.status}</td>
                        </tr>  
                    })}  
    
  </tbody>
</Table>:''}
</td>
</tr>   
</tbody>
</Table>
</div> 
               <div className={styles.noprint}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label> Pay Amount </Form.Label>
                        <Form.Control  className={styles.formField} type="number" placeholder="Enter Amount" value={payAmount} onChange={ e => setPayAmount(e.target.value) } required/>
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
                                        
                                        Pay Salary
                                    </Button><Button style={{marginLeft: '10%'}} onClick={handlePrint} className={styles.formButton} >
                                        
                                        Print Now
                                       </Button>
                                   </div> 
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
export default PaySalary