import React ,{ useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import {Link} from 'react-router-dom'
import * as AiIcons from 'react-icons/ai';
const Users =()=>{
let[gdata,setData] =useState([])
let role=localStorage.getItem("role") 
const [search,setSearch]=useState("")
const [ employeeNo, setEmployeeNo] = useState('')
let number=0
const addNum=()=>{
  number=number+1
}
const removeData = async(id) => {
    let flag= window.confirm("Delete  record!")
  if(flag)
  { 
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
        await axios.delete(`/api/auth/user`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        })
        } catch (error) {
            localStorage.removeItem("authToken")
            localStorage.removeItem("role")
            window.location="/login"
        }
    }
    
    fetchPrivateData()
   } 
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
       <button  onClick={handlePrint} className={styles.formButton} type="submit">  Print </button><br/>
       <input className={styles.sizeFilter} type="text" placeholder="Search by Name.." value={search} onChange={e=>setSearch(e.target.value)}/>
       &nbsp;<input  className={styles.sizeFilter} type="number" placeholder="Search Employee #" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } />
</div>
<div ref={componentRef} >
<div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Employees List</h3>
                  </div><br/>
       
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>#</th>
      <th>Employee #</th>
      <th> Name</th>
      <th>Role</th>
      <th>Phone #</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
    </tr>
  </thead>
  <tbody>
  {gdata.map((item) => {  
                        return <tr key={item._id}> 
                            <td onClick={addNum()}>{number}</td>
                            <td>{item.employeeNo}</td> 
                            <td>{item.username}</td>  
                            <td>{item.role}</td>  
                            <td>{item.phoneNo}</td>  
                            {role==='superAdmin'&&
                            <td className={styles.noprint}><Link to={ `/updateUser/${item._id}` }><AiIcons.AiOutlineEdit className={styles.sideButton1}  /></Link></td>}
                            {role==='superAdmin'&&
                            <td className={styles.noprint}>  <AiIcons.AiFillDelete className={styles.sideButton2} onClick={() => removeData(item._id)}/></td>} 
                            <td className={styles.noprint}><Link to={`/viewUser/${item._id}`}>  <AiIcons.AiOutlineFolderView className={styles.sideButton6}   /></Link></td>
                            {role==='superAdmin'?
                            <td className={styles.noprint}><Link to={ `/addSalaryUser/${item.employeeNo}` }><AiIcons.AiOutlineDollarCircle className={styles.sideButton3}  /></Link></td>:''}
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