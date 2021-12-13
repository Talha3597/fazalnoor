import {useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form,Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import {Link} from 'react-router-dom'

const ViewUser =({match})=>{
    const id=match.params.id
    const [username, setUserName]=useState("")
    const [email, setEmail]=useState("")
    const [joiningDate, setJoiningDate]=useState("")
    
    const [ employeeNo, setEmployeeNo ] = useState("")
   const [ address, setAddress ] = useState('')
    const [ phoneNo, setPhoneNo ] = useState('')
     const [salary, setSalary ] = useState('')
    const [ cnic, setCnic ] = useState('')
    const [ description, setDescription ] = useState('')
    
 let role=localStorage.getItem("role") 
  let[gdata,setData] =useState([]) 
 let[status,setStatus] =useState('') 
  let[month,setMonth] =useState('') 
  let createdBy=localStorage.getItem("username")
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
    await axios.delete(`/api/salary`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) 
}

useEffect(()=>{
    async function fetchSalaryData(){
        
        await axios.get('/api/salaries',{params:{month,status,employeeNo,year}})
        .then(res=>{
            setData(res.data)
            
        })
       }
    async function fetchData(){   
        await axios.get('/api/auth/user' ,{ params: {id} })
        .then(res=>{
            
            setUserName(res.data.username)
           setPhoneNo(res.data.phoneNo)
           setEmployeeNo(res.data.employeeNo)
            setEmail(res.data.email)
            setAddress(res.data.address)
            setCnic(res.data.cnic)
            setSalary(res.data.salary)
            setDescription(res.data.description)
            setJoiningDate(res.data.joiningDate)
        })
       }
       
 fetchData()
 
 fetchSalaryData()
 

},[id,month,status,employeeNo,year]
)
                       
    return(
       
           <>
              
                
            <div className={styles.margLeftRow}>
                
                <Row>

                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>View User</h1>
                        </div>
                        <div className="text-center">
                   
                    <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''defaultValue>Select Month</option>
                    <option value='Jan'>January</option>
                    <option value='Feb'>Februry</option>
                    <option value='Mar'>March</option>
                    <option value='Apr'>April</option>
                    <option value='May'>May</option>
                    <option value='Jun'>June</option>
                    <option value='Jul'>July</option>
                    <option value='Aug'>August</option>
                    <option value='Sep'>September</option>
                    <option value='Oct'>October</option>
                    <option value='Nov'>November</option>
                    <option value='Dec'>December</option>
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
                     <h3> Employee {username} </h3>
                      </div><br/>   
                      <div className="container1">
                       <div className="box2">
                       <Table bordered  size='lg'>
  <tbody>
 <tr > 
<td>    
                       <Table  bordered size='sm'>
  <tbody>
 <tr > 
 <td>Employee Number</td><td>{employeeNo}</td>    </tr> <tr>
 <td>Name</td><td>{username}</td> <td>CNIC</td><td>{cnic}</td> </tr> <tr>
 <td>Joining Date</td><td>{joiningDate}</td> <td>Phone</td><td>{phoneNo}</td> </tr> <tr>
 <td>Salary</td><td>{salary}</td> <td>Email</td><td>{email}</td>  </tr>  <tr>
 <td>Address</td><td>{address}</td> <td>Description</td><td>{description}</td></tr>  
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
                <th>Date</th>
                <th>Paid</th>
                <th>Person</th>
                <th>Status</th>

                </tr>
                </thead>
                <tbody>
                {gdata.map(item => {  
                                return <tr key={item._id}> 
                                    <td>{item.title}</td>  
                                    <td>{item.invoiceNo}</td>   
                                    <td>{item.salary}</td>  
                                    <td>{item.date}</td> 
                                    <td>{item.pending}</td>
                                    <td>{item.person}</td>
                                    <td>{item.status}</td>
                                    <td className={styles.noprint}>
                                    {role=='superAdmin'? 
                                    <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                                        Delete
                                    </Button>:''}<br/>&nbsp;
                                    {role=='superAdmin'|| role=='finance'|| role=='financeTeacher'||role=='adminFinance'? 
                                    <Link to={`/paySalary/${item._id}` } > <Button className={styles.sideButton1}  >
                                    Pay</Button></Link>:''}</td>
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

export default ViewUser