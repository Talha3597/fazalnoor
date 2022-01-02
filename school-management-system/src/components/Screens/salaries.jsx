import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios'
import {Link} from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

 
const Salary =  ()=> {
  var [today,setToday] =useState( new Date)
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  
  const [ employeeNo, setEmployeeNo] = useState('')
 let role=localStorage.getItem("role") 
let[gdata,setData] =useState([]) 
let[status,setStatus] =useState('') 
let[month,setMonth] =useState('') 
let createdBy=localStorage.getItem("username")
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
  let flag= window.confirm("Delete  record!")
  if(flag)
  { 
    await axios.delete(`/api/salary`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
          }) 
  }     
}
async function fetchData(){   
  await axios.get('/api/salaries',{params:{month,status,employeeNo,year}})
  .then(res=>{
      setData(res.data)
      
  })
 }

useEffect(()=>{
   
       
 fetchData()
 

},[month,status,employeeNo,year]
)
const generateDefaultFee = async()=>{
 let flag= window.confirm(`Generate Default Salary on ${date}`)
 if(flag)
 { await axios.post('/api/generateSalary',{createdBy,date})
 fetchData()
 }
  
 
 
}
const deleteRecord = async()=>{
  if(month && year){
  let flag= window.confirm("Delete  record of specific month")
  if(flag)
  { 
    await axios.delete('/api/deleteSalary', { params: {month,year} })
 fetchData()
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
                   
                    <select   as="select" value={month} onChange={ e => setMonth(e.target.value) } >
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
                   <select as="select" value={status} onChange={ e => setStatus(e.target.value) } >
                   <option value=''defaultValue>Select status</option>
                   <option value='Paid'>Paid</option>
                   <option value='Unpaid'>Unpaid</option>
                  
                 </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                   <input   type="number" placeholder="Search Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } />
                                   &nbsp;<DatePicker
                                                selected={today}
                                                onChange={date => setToday(date)}
                                                className={styles.sizeFilter}
                                                 />  
                                         
                                   </div><div ref={componentRef} >
                 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Salary </h3>
                 </div>
<h5> &nbsp;{employeeNo ? "Employee No:"+employeeNo:
                 <h5>&nbsp;{status ? "Status:"+status:''}&nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>        

}</h5>
                        
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Employee #</th>
      <th>Employee Name</th>
      <th> Title</th>
      <th>Invoice #</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Paid</th>
      <th>Person</th>
      <th>Status</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
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
                            
                            <td className={styles.noprint}>
                           {role=='superAdmin'? 
                            <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                             Delete
                            </Button>:''}</td><td>
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