import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
 import axios from 'axios'

const ReportFinance =  ()=> {
   // const [message, setMessage]=useState("")
   var today = new Date()
  
let sum4=0

let[sdata,setSalaryData] =useState([0]) 
let[month,setMonth] =useState('') 
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
 
       async function fetchSalaryData(){   
        await axios.get('http://localhost:5000/api/salaryStaffReport', { params: {month,year} })
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
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
  
</div><div ref={componentRef} ><div className={styles.margLeftRowTable }>
 <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Salary Report</h3>
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