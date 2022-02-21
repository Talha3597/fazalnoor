import React, { useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import {Link} from 'react-router-dom'

import axios from 'axios'

const Expense =({})=> {
   
   const today=new Date()
   let[year,setYear] =useState( today.getFullYear())
   
let[gdata,setData] =useState([]) 
let [month,setMonth]=useState(parseInt(today.getMonth()+1))
let role=localStorage.getItem("role") 
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
const search=" "
const minusYear=()=>{
  setYear(year=>year-1)
  }
const addYear=()=>{
  setYear(year=>year+1)
}
//const  [query ,setQuery ]= useState('')
const removeData = async(id) => {
  let flag= window.confirm("Delete  record!")
  if(flag)
  {  const config= {
    headers:{
        
        Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        role:localStorage.getItem("role")
    }
  }
  const fetchPrivateData=async()=>
  {
   
   try {
    const {data}=  (await axios.get('/api/private',config))
    await axios.delete(`/api/Expense`, { params: {id} }) 
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
useEffect(()=>{
  if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
  {  
      window.location="/login"
  }
},[])
async function fetchData(){ 
    
  await axios.get('/api/Expenses',{params:{month,year}})
  .then(res=>{
    setData(res.data)
  }) 
}
useEffect(()=>{
  fetchData()

},[month, year])
const deleteRecord = async()=>{
  if(month && year){
  let flag= window.confirm("Delete  record of specific month")
  if(flag)
  { const config= {
    headers:{
        
        Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        role:localStorage.getItem("role")
    }
  }
  const fetchPrivateData=async()=>
  {
   
   try {
    const {data}=  (await axios.get('/api/private',config))
    await axios.delete('/api/deleteExpense', { params: {month,year} })
 fetchData()
    } catch (error) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("role")
        window.location="/login"
    }
  }
  
  fetchPrivateData()
  
  }
}else{
  window.alert('Select month to delete Paid record')
}
  
  
 }

return (
 <>
 

                          
    
        <div className={styles.margLeftRowTable }>
        
    <br/> 
                    <div className="text-center">
                      <Link to={`/addExpense`}>
                    <button className={styles.formButton} >
                    
                    &nbsp;   Add Expense  &nbsp;
                    </button> </Link> &nbsp;
                            {role=='superAdmin'? <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button>:''} &nbsp;
                    <select   as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''>{year}</option>
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
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
           </div><br/><div ref={componentRef} > <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Expenses</h3>
                  </div>
                  <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
      <br/>
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Title</th>
      <th> Category</th>
      <th>Amount</th>
      <th>Invoice Number</th>
      <th>Date</th>
      <th>Note</th>
      <th>Created By</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.title}</td> 
                            <td>{item.ExpenseCategory}</td>  
                            <td>{item.amount}</td>  
                            <td>{item.invoiceNo}</td>  
                            <td className={styles.tableDateSize}>{item.date}</td>  
                            <td>{item.note}</td>
                            <td>{item.createdBy}</td>
                            <td className={styles.noprint}> 
                            {role=='superAdmin'? 
                            <Link to={`/updateExpense/${item._id}` }><AiIcons.AiOutlineEdit className={styles.sideButton1}   /></Link>:''}</td>
                            <td className={styles.noprint}>    {role=='superAdmin'?
                            <AiIcons.AiFillDelete className={styles.sideButton2} onClick={() => removeData(item._id)}/>:''}</td>
                            <td className={styles.noprint}>   <Link to={`/expenseView/${item._id}` }><AiIcons.AiOutlineFolderView className={styles.sideButton6}   /></Link></td>
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
export default Expense