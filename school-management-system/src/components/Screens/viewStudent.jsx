import React, { useEffect, useState,useRef} from 'react';
import axios from 'axios';
import { Row, Col, Form,Button,Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../assets/style.module.css'
import { useReactToPrint } from 'react-to-print';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom'

function ViewUser({match}){
    const id=match.params.id
     
     const [address, setAddress]=useState('')
    const [ studentNo, setStudentNo ] = useState('')
    let [ studentName, setStudentName ] = useState('')
    let [ rollNo, setRollNo ] = useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    let [ parentName, setParentName ] = useState('')
    let [ phoneNo, setPhoneNo ] = useState('')
    let [ parentRelation, setParentRelation  ] = useState('')
    const [ dob, setDob ] = useState('')
    const [ schoolFee, setSchoolFee ] = useState('')

   const [ cnic, setCnic ] = useState('')
    let [ email, setEmail ] = useState('')
    let [ description, setDescription ] = useState('')
    let[gdata,setData] =useState([]) 
let[month,setMonth] =useState('') 
let[status,setStatus] =useState('') 

let createdBy=localStorage.getItem("username")
let role=localStorage.getItem("role")
let today=new Date()
let[year,setYear] =useState( today.getFullYear())
const minusYear=()=>{
  setYear(year=>year-1)
  }
const addYear=()=>{
  setYear(year=>year+1)
}
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
const removeData = async(id) => {
    await axios.delete(`/api/fee`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) 
}

useEffect(()=>{

    async function fetchData(){ 
          
        await axios.get('/api/fees', { params: {month,Class,section,status,studentNo,year} })
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()


},[month,status,studentNo,year]
)

      
useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/student' ,{ params: {id} })
        .then(res=>{
            
            setStudentName(res.data.studentName)
            setStudentNo(res.data.studentNo)
            setParentName(res.data.parentName)
            setRollNo(res.data.rollNo)
            setPhoneNo(res.data.phoneNo)
            setEmail(res.data.email)
            setParentRelation(res.data.parentRelation)
            setClass(res.data.Class)
            setSection(res.data.section)
            setAddress(res.data.address)
            setDob(res.data.dob)
            setCnic(res.data.cnic)
            setSchoolFee(res.data.fee)
        })
       }
       
 fetchData()
 

},[id]
)   
     
return( <>

     
  <div className={styles.margLeftRow}>
      <Row>
          <Col md={12}>

              <div className={styles.backBar}>
                  <h1>View Student</h1>
              </div>
              
              <div className="text-center">
                   
                   <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                   <option value=''defaultValue>Select Month</option>
                   <option value='1'>January</option>
                    <option value='2'>Februry</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                   </select>&nbsp;&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                 <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;
                  <select required  as="select" value={status} onChange={ e => setStatus(e.target.value) } >
                  <option value=''defaultValue>Select status</option>
                  <option value='Paid'>Paid</option>
                  <option value='Unpaid'>Unpaid</option>
                  </select></div>
                  <br/>
                              &nbsp; &nbsp; <button  onClick={handlePrint} className={styles.formButton} type="submit">
                                       
                                       Print
                                      </button>
                                      <div ref={componentRef} >
                  <div className={styles.formHeading}>
                    <h3> Al Khidmat Fazal Noor Campus </h3>
                    <h3> Student {studentName} </h3>
                     </div>
                              
                              
                      <br/>
                      <div className='container1'>
                      <div className='box2'>
                      <Table bordered  size='lg'>
  <tbody>
 <tr > 
<td>    
                       <Table  bordered size='sm'>
  <tbody>
 <tr > 
 <td>Student Number</td><td>{studentNo}</td> <td>Guardian Name</td><td>{parentName}</td>   </tr> <tr>
 <td>Name</td><td>{studentName}</td> <td>CNIC</td><td>{cnic}</td> </tr> <tr>
 <td>Class</td><td>{Class}</td> <td>Phone</td><td>{phoneNo}</td> </tr> <tr>
 <td>Section</td><td>{section}</td> <td>Email</td><td>{email}</td>  </tr> <tr>
 <td>Date of birth</td><td>{dob}</td> <td>Guardian Relation </td><td>{parentRelation}</td></tr> <tr>
 <td>Address</td><td>{address}</td> <td>School Fee</td><td>{schoolFee}</td></tr> <tr>
 <td></td><td></td> <td>Description</td><td>{description}</td>
</tr>  
</tbody>
</Table>
</td>
</tr>

</tbody>
</Table>
                     
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      
      <th> Title</th>
      <th>Invoice Number</th>
      <th>Amount</th>
      <th>Discount</th>
      <th>Class</th>
      <th>section</th>
      <th>Date</th>
      <th>Paid</th>
      <th>person</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                           
                            <td>{item.title}</td>  
                            <td>{item.invoiceNo}</td>  
                            <td>{item.amount}</td>  
                            <td>{item.discount}</td>
                            <td>{item.Class}</td>  
                            <td>{item.section}</td>  
                            <td>{item.date}</td> 
                            <td>{item.pending}</td>
                            <td>{item.person}</td>
                            <td>{item.status}</td>
                            <td className={styles.noprint}>  {role=='superAdmin'?
                        <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                         Delete
                        </Button>:''}<br/>&nbsp;
                        {role=='superAdmin'|| role=='finance'|| role=='financeTeacher'||role=='adminFinance'? 
                        <Link to={`/payFee/${item._id}` } ><Button className={styles.sideButton1}  >
                        Pay</Button></Link>:''} </td>
                         
                        </tr> 
                        
                    })}  
    
  </tbody>
</Table>
       </div>
       </div>
                  </div>
                  
              
          </Col>

      </Row>
  </div>





</>
)
}
export default  ViewUser