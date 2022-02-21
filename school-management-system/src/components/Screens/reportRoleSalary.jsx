import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
 import axios from 'axios'

const ReportFinance =  ()=> {
   var today = new Date() 
let sum4=0
let[sdata,setSalaryData] =useState([0]) 
let[month,setMonth] =useState(parseInt(today.getMonth()+1)) 
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
useEffect(()=>{
  if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
  {  
      window.location="/login"
  }
},[])
useEffect(()=>{
 
       async function fetchSalaryData(){   
        await axios.get('/api/salaryStaffReport', { params: {month,year} })
        .then(res=>{
            if(res.data[0]){  setSalaryData(res.data)}
            else{setSalaryData([0])}
        })
       }
       

 fetchSalaryData()


},[month,year]
)

return (
 <>
   <br/>  
                   <div className="text-center">
                
                   <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
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
  
</div><div ref={componentRef} ><div className={styles.margLeftRowTable }>
 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Salary Report</h3>    <div className='fakeimg4' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
                 </div>

                 <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>        
                          <div className="tableMarginFormal">
                         
  <div className={styles.tableMarginFormal}>
<Table  bordered  size='sm'>
  <thead>
    <tr><th>Salary Report(-)</th></tr>
    <tr>
      
      <th> Name</th>
      <th>Amount</th>
      
     
      
    </tr>
  </thead>
  <tbody>
  {sdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item._id}</td>  
                            <td>{item.amount}</td>  
                             
                        </tr>  
                    })}
                    <tr><td>Total(PKR)</td><td>{sdata[0]?
sum4=sdata.map(item=>item.amount).reduce((a,item)=>item+a):0}</td></tr>  
    
  </tbody>
</Table>
</div>
 </div>
 </div> 
 </div>  
  </>
)
             
}
export default ReportFinance