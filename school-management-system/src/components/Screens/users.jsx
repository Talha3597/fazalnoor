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
    await axios.delete(`/api/auth/user`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata.employeeNo)
            setData(del)
           
        }) 
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
    <div ref={componentRef} >
       <Row>

           <Col><div className={styles.backBar}>
                            <h1>Users List</h1>
                        </div></Col>
       </Row>
       <div className='text-center'>      
       <input type="text" placeholder="Search by Name.." value={search} onChange={e=>setSearch(e.target.value)}/>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <input   type="number" placeholder="Search Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } />
                       &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
</div>
<br/>

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
                            <td><Link to={ `/updateUser/${item._id}` }><Button className='btn btn-outline-info bg-light'  >
                            Edit</Button></Link></td>
                            :''}
                            {role=='superAdmin'?
                            <td>  <Button className='btn btn-outline-danger bg-light' onClick={() => removeData(item.employeeNo)}>
                             Delete
                            </Button></td> :''}
            
                            <td><Link to={`/viewUser/${item._id}`}>  <Button className='btn btn-outline-warning bg-light'   >
                            View</Button></Link></td>
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