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
    await axios.delete(`/api/income`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) 
}
const deleteRecord = async()=>{
  if(month && year){
  let flag= window.confirm("Delete Paid record of specific month")
  if(flag)
  { 
    await axios.delete('/api/deleteIncome', { params: {month,year} })
 
  }
}else{
  window.alert('Select month to delete Paid record')
}
  
  
 }


useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/incomes',{params:{month,year}})
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()
 

},[month,year]
)


return (
 <>
 

                          
   
        <div className={styles.margLeftRowTable }>
      <br/>
       <div className="text-center">
             &nbsp;
             <button className={styles.formButton} onClick={() => window.location="/addIncome"}>
                    
                    &nbsp;   Add Income   &nbsp;
                    </button>  &nbsp;
                            {role=='superAdmin'? <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button>:''} &nbsp;
                    <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''>Select Month</option>
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
      <th>Invoice Number</th>
      <th>Date</th>
      <th>Received By</th>
          </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.title}</td> 
                            <td>{item.incomeCategory}</td>  
                            <td>{item.amount}</td>  
                            <td>{item.invoiceNo}</td>  
                            <td>{item.date}</td>  
                            <td>{item.receivedBy}</td>
            
                            <td>
                            {role=='superAdmin'?
                            <Link to={`/updateIncome/${item._id}` } ><Button className='btn btn-outline-info bg-light '  >
                            Edit</Button></Link> :''}</td>
                            <td>   {role=='superAdmin'? 
                            <Button className='btn btn-outline-danger bg-light ' onClick={() => removeData(item._id)}>
                             Delete
                            </Button>:''}</td> 
                            <td> <Link to={`/incomeView/${item._id}` } ><Button className='btn btn-outline-warning bg-light '  >
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