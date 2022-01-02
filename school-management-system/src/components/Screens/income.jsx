import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import {Link} from 'react-router-dom'


const Income =  ()=> { 
let[gdata,setData] =useState([]) 
let[month,setMonth] =useState('') 
let today=new Date()

let role=localStorage.getItem("role") 
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
//const  [query ,setQuery ]= useState('')
const removeData = async(id) => {
  let flag= window.confirm("Delete  record!")
  if(flag)
  { 
    await axios.delete(`/api/income`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) }
}
const deleteRecord = async()=>{
  if(month && year){
  let flag= window.confirm("Delete Paid record of specific month")
  if(flag)
  { 
    await axios.delete('/api/deleteIncome', { params: {month,year} })
    fetchData()
  }
}else{
  window.alert('Select month to delete Paid record')
}
  
  
 }

 async function fetchData(){   
  await axios.get('/api/incomes',{params:{month,year}})
  .then(res=>{
      setData(res.data)
      
  })
 }
useEffect(()=>{
    
       
 fetchData()
 

},[month,year]
)


return (
 <>
 

                          
   
        <div className={styles.margLeftRowTable }>
      <br/>
       <div className="text-center">
       <Link to={`/addIncome` } >
             <button className={styles.formButton} >
                    
                    &nbsp;   Add Income   &nbsp;
                    </button> </Link> &nbsp;
                            {role=='superAdmin'? <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button>:''} &nbsp;
                    <select  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''>Select Month</option>
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

                 </div><div ref={componentRef} >
 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Income</h3>
                  </div>
                  <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
  

       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Title</th>
      <th> Category</th>
      <th>Amount</th>
      <th>Invoice #</th>
      <th>Date</th>
      <th>Received By</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
          </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.title}</td> 
                            <td>{item.incomeCategory}</td>  
                            <td>{item.amount}</td>  
                            <td>{item.invoiceNo}</td>  
                            <td className={styles.tableDateSize}>{item.date}</td>  
                            <td>{item.receivedBy}</td>
            
                            <td className={styles.noprint}>
                            {role=='superAdmin'?
                            <Link to={`/updateIncome/${item._id}` } ><Button className={styles.sideButton1}  >
                            Edit</Button></Link> :''}</td>
                            <td className={styles.noprint}>   {role=='superAdmin'? 
                            <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                             Delete
                            </Button>:''}</td> 
                            <td className={styles.noprint}> <Link to={`/incomeView/${item._id}` } ><Button className={styles.sideButton3}  >
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
export default Income