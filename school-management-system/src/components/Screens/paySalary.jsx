import React, { useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios'
//import { data } from 'jquery';

const PaySalary =  ( {match})=> {
   // const [message, setMessage]=useState("")
 
     const id=match.params.id
     let due=0
    const [ employeeNo, setEmployeeNo] = useState('')
    const [ name, setName] = useState('')
    const [ key, setKey] = useState('')
    const [ salary, setSalary] = useState(0)
     const [title, setTitle]=useState('')
  
    const [pending, setPending]=useState('')
    const [date1, setDate1]=useState('')
    const [payAmount, setPayAmount]=useState('')
    const [invoiceNo, setInvoiceNo]=useState('')
    let  receivedBy=localStorage.getItem("username")
    let[gdata,setData] =useState([]) 
    let[gdata1,setData1] =useState([]) 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });    
    due=salary-pending
    useEffect(()=>{
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
           setKey(res.data[0].invoiceNo) 
              
        }
           )
          
        }
        
        
           async function fetchDepositeData(){   
            await axios.get(`/api/salaryDeposite`,{ params: {key} } )
            .then(res=>{
             setData1(res.data)
            })
         
           
         }
    
     fetchSalaryData()
    
     fetchDepositeData()
    },[key]
    )    
    const onSubmit = async(e) => {
        e.preventDefault()
       
     const{data}=await axios.post('/api/paySalary',{id,name,employeeNo,title,salary,payAmount,pending,receivedBy,key})
     
     alert(data.message) 
    window.location=`/paySalary/${id}`
     
      
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
      <th> Title</th>
      <th>Invoice Number</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Paid</th>
      <th>person</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {gdata1.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.title}</td>  
                            <td>{item.invoiceNo}</td>  
                            <td>{item.salary}</td>  
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
               
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label> Pay Amount </Form.Label>
                        <Form.Control  className={styles.formField} type="number" placeholder="Enter Amount" value={payAmount} onChange={ e => setPayAmount(e.target.value) } required/>
                    </Form.Group>
                                
                    <Button className={styles.formButton} type="submit">
                                        
                                        Pay Salary
                                    </Button><Button style={{marginLeft: '10%'}} onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print Now
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
export default PaySalary