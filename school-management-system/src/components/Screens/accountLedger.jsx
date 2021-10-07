import React, { useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';

 
const ReportFinance =  ()=> {
   // const [message, setMessage]=useState("")
   var today = new Date()
   let[year,setYear] = useState(today.getFullYear())

let[idata,setIncomeData] =useState(0) 
let[fdata,setFeeData] =useState(0) 
let[finedata,setFineData] =useState(0) 
let[edata,setExpenseData] =useState('0+0') 

let[month,setMonth] =useState('') 
const minusYear=()=>{
  setYear(year=>year-1)
  }
const addYear=()=>{
  setYear(year=>year+1)
}

let expense=parseInt(edata.toString().split('+')[0])
let salary=parseInt(edata.toString().split('+')[1])

useEffect(()=>{

    function fetchFeeData(){   
     axios.get('/api/feeGeneralReport', { params: {month,year} })
    .then(res=>{
        setFeeData(res.data)
        
    })
   } 
   function fetchIncomeData(){   
     axios.get('/api/incomeDashboard', { params: {month,year} })
    .then(res=>{
        setIncomeData(res.data)
        
    })
   }
    function fetchFineData(){   
     axios.get('/api/feeFineReport', { params: {month,year} })
    .then(res=>{
        setFineData(res.data)
        
    })
   } 
   
    function fetchExpenseData(){   
     axios.get('/api/expenseDashboard', { params: {month,year} })
    .then(res=>{
        setExpenseData(res.data)
        
    })
   }
   
  fetchFineData()
  fetchExpenseData()
   fetchIncomeData()
   fetchFeeData()
   
},[month,year]
)

const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});



return (
 <>
 

                          
   
        <div className={styles.margLeftRowTable }>
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
                  </select>&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
</div>
<div ref={componentRef} >
        <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Account Ledger</h3>
                     <div className='fakeimg4' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
                 </div>
                 <br/>      
       
 <h5>&nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
 
                          <Table  size='lg'>
  <tbody>
  <tr>
  <td>   
       <Table  bordered  size='sm'>
  <thead>
    <tr>
      <th> Income</th>
    </tr>
  </thead>
  <tbody>
  <tr><td>Income is money that an individual or business receives in exchange
      for providing a good service or thorugh investing capital</td></tr>
 <tr><td>Total(PKR)</td><td>{idata}</td></tr> 
  </tbody>
</Table>
</td>
<td>    
<Table  bordered  size='sm'>
  <thead>
    <tr>
      <th> Fees Collections</th>
    </tr>
  </thead>
  <tbody>
  <tr> <td>This part of system shows, sum of total paid amount of student invoices</td></tr>
 <tr><td>Total(PKR)</td><td>{fdata-finedata}</td> </tr> 
  </tbody>
</Table>
</td>
</tr>
<tr>
<td>
<Table  bordered  size='sm'>
  <thead>
    <tr>
      <th> Total Balance</th>
    </tr>
  </thead>
  <tbody>
  <tr><td>Fees Collections(+)</td><td>{fdata-finedata}</td></tr>
 <tr><td>Fines(+)</td><td>{finedata}</td> </tr>
 <tr><td>Expense(-)</td><td>{expense+salary}</td> </tr>
 <tr><td>Salary(-)</td><td>{salary}</td> </tr>
 <tr><td>Income(+)</td><td>{idata}</td></tr>
 <tr><td>Grand Total(PKR)</td><td>{idata-(expense+salary)}</td></tr>
  </tbody>
</Table>
</td>
<td>
<Table  bordered  size='sm'>
  <thead>
    <tr>
      <th> Fines</th>
    </tr>
  </thead>
  <tbody>
  <tr><td>Total sum of fine taken from students</td></tr>
 <tr><td>Total(PKR)</td><td>{finedata}</td> </tr> 
  </tbody>
  </Table>
  <Table  bordered  size='sm'>
  <thead>
    <tr>
      <th> Expense</th>
    </tr>
  </thead>
  <tbody>
  <tr><td>Every school have several area of expenses,this part shows the Total
      sum of expenses spend over a time range</td></tr>
 <tr><td>Total(PKR)</td><td>{expense+salary}</td></tr> 
  </tbody>
</Table>
<Table  bordered  size='sm'>
  <thead>
    <tr>
      <th> Salary</th>
    </tr>
  </thead>
  <tbody>
  <tr> <td>Total sum of salary given to employees,teacher and other staffs over the time range</td></tr>
 <tr><td>Total(PKR)</td><td>{salary}</td></tr> 
  </tbody>
</Table> 
</td>
</tr>
</tbody>
</Table>
</div>
</div>

  </>
)
             
}
export default ReportFinance