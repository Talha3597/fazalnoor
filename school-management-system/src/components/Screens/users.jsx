import React ,{ useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import {Link} from 'react-router-dom'
const Users =()=>{
let[gdata,setData] =useState([])
let role=localStorage.getItem("role") 
const [search,setSearch]=useState("")
const [ employeeNo, setEmployeeNo] = useState('')

//const  [query ,setQuery ]= useState('')
const removeData = async(id) => {
    let flag= window.confirm("Delete  record!")
  if(flag)
  { 
    await axios.delete(`/api/auth/user`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        })} 
}

const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/auth/users', { params: {search,employeeNo} })
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()
 

},[search,employeeNo]
)
return(
    <>
           
     
    
   
    <div className={styles.margLeftRowTable }>
    <div className={styles.empty}></div>
       <div className='text-center'>      
       <input type="text" placeholder="Search by Name.." value={search} onChange={e=>setSearch(e.target.value)}/>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <input   type="number" placeholder="Search Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } />
                       &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
</div>
<br/>
<div ref={componentRef} >
<div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Employees List</h3>
                  </div><br/>
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Employee Number</th>
      <th> Name</th>
      <th>CNIC</th>
      <th>Role</th>
      <th>Phone Number</th>
      <th>Address</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.employeeNo}</td> 
                            <td>{item.username}</td>  
                            <td>{item.cnic}</td>  
                            <td>{item.role}</td>  
                            <td>{item.phoneNo}</td>  
                            <td>{item.address}</td>
                              
                            {role=='superAdmin'?
                            <td className={styles.noprint}><Link to={ `/updateUser/${item._id}` }><Button className={styles.sideButton1}  >
                            Edit</Button></Link></td>
                            :''}
                            {role=='superAdmin'?
                            <td className={styles.noprint}>  <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                             Delete
                            </Button></td> :''}
            
                            <td className={styles.noprint}><Link to={`/viewUser/${item._id}`}>  <Button className={styles.sideButton3}   >
                            View</Button></Link></td>
                            {role=='superAdmin'?
                            <td className={styles.noprint}><Link to={ `/addSalaryUser/${item.employeeNo}` }><Button className={styles.sideButton1}  >
                            Add Salary</Button></Link></td>
                            :''}
                        </tr>  
                    })}  
    
  </tbody>
</Table>
       </div>
    </div>
   </div>
       </>
)

}
export default Users