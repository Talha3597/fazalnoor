import React, { useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';


const PayFee =  ( {match,history})=> {
   var [today,setToday] =useState( new Date())
   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
 
     const id=match.params.id
     let due=0
    const [ studentNo, setStudentNo] = useState(0)
    const [ name, setName] = useState('')
    const [ schoolFee, setSchoolFee] = useState(0)
    const [ Class, setClass] = useState('')
    const [ section, setSection] = useState('')
     const [title, setTitle]=useState('')
    let [amount, setAmount]=useState(0)
    let [pending, setPending]=useState(0)
    const [discount, setDiscount]=useState(0)
    const [date1, setDate1]=useState('')
    const [payAmount, setPayAmount]=useState(0)
    const [invoiceNo, setInvoiceNo]=useState(0)
    let  receivedBy=localStorage.getItem("username")
    let[gdata,setData] =useState([]) 
    let[gdata1,setData1] =useState([])
    const [message, setMessage]=useState("")
    const [error, setError]=useState("")
     
    if(discount>0)
    {
        amount=Math.round(amount*((100-discount)/100))
    }
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
 async function fetchDepositeData(){   
            await axios.get(`/api/feeDeposite`,{ params: {invoiceNo} } )
            .then(res=>{
             setData1(res.data)
            })
         
           
         }   
          
        async function fetchFeeData(){   
            //let data
           await axios.get(`/api/fee`,{ params: {id} } )
           .then(res=>{
            setData(res.data)
           setStudentNo(res.data[0].studentNo) 
           setTitle(res.data[0].title) 
           setAmount(res.data[0].amount) 
           setPending(res.data[0].pending)
           setDate1(res.data[0].date) 
           setInvoiceNo(res.data[0].invoiceNo) 
              
        }
           )
          
        }
          
     
       
    
    due=amount-pending
    useEffect(()=>{
        axios.get(`/api/feeDeposite`,{ params: {invoiceNo} } )
        .then(res=>{
         setData1(res.data)
        })
     
    },[invoiceNo])
    useEffect(()=>{
        axios.get('/api/findstudent' ,{ params: {studentNo} })
        .then(res=>{
           if(res.data[0]){ 
            setName(res.data[0].studentName)
            setStudentNo(res.data[0].studentNo)
            setClass(res.data[0].Class)
            setSection(res.data[0].section)
            setSchoolFee(res.data[0].fee)}
            else{
               
                setName('')
                setClass('')
                setSection('')
                setSchoolFee('')
            }
        })
       
    },[studentNo])

    useEffect(()=>{
        axios.get(`/api/fee`,{ params: {id} } )
        .then(res=>{
         setData(res.data)
        setStudentNo(res.data[0].studentNo) 
        setTitle(res.data[0].title) 
        setAmount(res.data[0].amount) 
        setPending(res.data[0].pending)
        setDate1(res.data[0].date) 
        setInvoiceNo(res.data[0].invoiceNo) 
           
     }
        )
       
     
    },[id]
    )    
    const onSubmit = async(e) => {
        e.preventDefault()
      if(payAmount<=0)
      {
        setTimeout(()=>{
            setError("")
            
            },4000)
           return setError(" Enter Payable Amount")

      } 
      if(payAmount > due){
        setTimeout(()=>{
            setError("")
            
            },4000)
            return setError(` Entering Extra Amount `)
      }
      if(discount<0 || discount>100)
      {
        setTimeout(()=>{
            setError("")
            
            },4000)
           return setError(" Discount should be in range 0 to 100")

      }
     const{data}=await axios.post('/api/payFee',{id,discount,studentNo,title,amount,invoiceNo,payAmount,pending,receivedBy,Class ,section,date})
    setTimeout(()=>{
        setMessage('')
      
        fetchFeeData()
          fetchDepositeData()
      setDiscount(0)
       setPayAmount(0)
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
                     <h1> Pay Fee </h1> 
                 </div><div ref={componentRef} >
                 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Fee Slip</h3>
                     <div className='fakeimg4' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
                 </div>
                 
                 <div className={styles.formStyle}>
                 <div className={styles.Border}>
                 {error && <Button  className={styles.sideButton5} autoFocus >{error}</Button>}           
                {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}    </div>         
                                              <br/>
                         
                         <form  onSubmit={onSubmit} >
                        
                         
                        <label> Student Number : </label>&nbsp;{studentNo}
                         &nbsp;&nbsp;&nbsp; <label>Name :</label>&nbsp;{name}
                        <br/>
        
                        <label>Class :</label>&nbsp;{Class}&nbsp;&nbsp;&nbsp;
                        
                        <label>Section :</label>&nbsp;{section}&nbsp;&nbsp;
                         &nbsp; <label> Default School Fee :</label>&nbsp;{schoolFee}
                        <br/><br/>
                       
                       &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <h3>Title :&nbsp;{title}</h3>
                       <div className={styles.tableMargin }>
                       <Table bordered  size='lg'>
  <tbody>
 <tr > 
<td>    
                       <Table  bordered size='sm'>
  <tbody>
 <tr ><td>Title</td><td>{title}</td>   </tr>
 <tr ><td>Amount</td><td>{amount}</td>   </tr> <tr>
 <td>Paid</td><td>{pending}</td> </tr>
<tr ><td>Invoice</td><td>{invoiceNo}</td>   </tr>
 <tr><td>Discount</td><td>{discount}</td> </tr> <tr>
 <td>Issue Date</td><td>{date1}</td>  </tr> <tr>
 <td>Pending</td><td>{due}</td>
</tr>  
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
{gdata1[0]?'': <div> <label>Discount</label>&nbsp;
                        <input   type="number" placeholder="Enter Title" value={discount} onChange={ e => setDiscount(e.target.value) } />%</div> }
                        
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
                                        
                                        Pay Fee
                                    </Button>
                                    <Button style={{marginLeft: '10%'}} onClick={handlePrint} className={styles.formButton} >
                                        
                                        Print Now
                                       </Button> </div>
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
export default PayFee