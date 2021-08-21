import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios'
import {Link} from 'react-router-dom'
const Salary =  ()=> {
   // const [message, setMessage]=useState("")
   const [ employeeNo, setEmployeeNo] = useState('')
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
    await axios.delete(`http://localhost:5000/api/salary`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) 
}

useEffect(()=>{
    async function fetchData(){   
        await axios.get('http://localhost:5000/api/salaries',{params:{month,status,employeeNo,year}})
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()
 

},[month,status,employeeNo,year]
)
const generateDefaultFee = async()=>{
 let flag= window.confirm("Generate Default Salary for All Users")
 if(flag)
 { await axios.post('http://localhost:5000/api/generateSalary',{createdBy})
 }
  
 
 
}
const deleteRecord = async()=>{
  if(month && year){
  let flag= window.confirm("Delete Paid record of specific month")
  if(flag)
  { 
    await axios.delete('http://localhost:5000/api/deleteSalary', { params: {month,year} })
 
  }
}else{
  window.alert('Select month to delete Paid record')
}
  
  
 }



return (
 <>
 

                          
    
        <div className={styles.margLeftRowTable }>
       <br/><div className="text-center">
       <button  onClick={handlePrint} className={styles.formButton} type="submit"> Print </button> &nbsp;   
         {role=='superAdmin'?<div><button className={styles.formButton} onClick={() => window.location="/addSalary"}>
                    
        &nbsp;   Add Salary &nbsp;
        </button>
        &nbsp;
        <button className={styles.formButton} onClick={() => generateDefaultFee()}>
        <span>&#9888; </span> Generate Default Salary
                            </button>
                           
                    &nbsp;
                             <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button></div>:''}</div>
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
                  
                 </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                   <input   type="number" placeholder="Search Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } />
                                         
                                   </div><div ref={componentRef} >
                 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Salary </h3>
                 </div>

                 <h5> &nbsp;{employeeNo ? "Employee No:"+employeeNo:''}&nbsp;{status ? "Status:"+status:''}&nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>        
                        
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Employee Number</th>
      <th>Employee Name</th>
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
                            <td>{item.employeeNo}</td> 
                            <td>{item.username}</td> 
                            <td>{item.title}</td>  
                            <td>{item.invoiceNo}</td>   
                            <td>{item.salary}</td>  
                            <td>{item.date}</td> 
                            <td>{item.pending}</td>
                            <td>{item.person}</td>
                            <td>{item.status}</td>
                            <td>
                           {role=='superAdmin'? 
                            <Button className='btn btn-outline-danger bg-light ' onClick={() => removeData(item._id)}>
                             Delete
                            </Button>:''}
                           <Link to={`/paySalary/${item._id}` } > <Button className={styles.sideButton1}  >
                            Pay</Button></Link></td>
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
export default Salary