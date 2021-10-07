import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';



import axios from 'axios'

const ReportFinanceRole =  ()=> {
   // const [message, setMessage]=useState("")
let sum1,sum2 ,sum3,sum4,iSum,eSum,rSub=0
let[idata,setIncomeData] =useState([0]) 
let[fdata,setFeeData] =useState([0]) 
let[edata,setExpenseData] =useState([0]) 
let[sdata,setSalaryData] =useState([0]) 
let[month,setMonth] =useState('') 
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

useEffect(()=>{
 
    async function fetchIncomeData(){   
        await axios.get('/api/incomeReportRole', { params: {month,year} })
        .then(res=>{
          if(res.data[0]){setIncomeData(res.data) }
            else{setIncomeData([0])} 
            
        })
       }
       async function fetchFeeData(){   
        await axios.get('/api/feeReportRole', { params: {month,year} })
        .then(res=>{
          if(res.data[0]){ setFeeData(res.data)}
            else{setFeeData([0])}  
            
        })
       }
       async function fetchExpenseData(){   
        await axios.get('/api/expenseReportRole', { params: {month,year} })
        .then(res=>{
          if(res.data[0]){ setExpenseData(res.data)}
            else{setExpenseData([0])}  
            
        })
       }
       async function fetchSalaryData(){   
        await axios.get('/api/salaryReportRole', { params: {month,year} })
        .then(res=>{
          if(res.data[0]){ setSalaryData(res.data) }
          else{setSalaryData([0])}
            
        })
       }
       
 fetchIncomeData()
 fetchFeeData()
 fetchExpenseData()
 fetchSalaryData()


},[month,year]
)

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
                  </select>&nbsp;
&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                        </button>

</div><div ref={componentRef} >

<div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Cashier Report</h3>    <div className='fakeimg4' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
                 </div>
                 <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
  
                        
                          <div className="tableMarginFormal">
                          <Table bordered  size='sm'>
  <tbody>
  <tr>
  <td>                        
       <Table  bordered  size='sm'>
  <thead>
  <tr><th> Income(+)</th></tr>
    <tr>
      <th> Title</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
  {idata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item._id}</td>  
                            <td>{item.amount}</td>      
                            
                        </tr>    })}  
                        <tr><td>Total(PKR)</td><td>{idata[0]?
sum1=idata.map(item=>item.amount).reduce((a,item)=>item+a):0}
                    </td>
                    </tr>             
    
  </tbody>
</Table>
</td>
<td>
<Table  bordered  size='sm'>
  <thead>
    <tr><th>Fee Report (+)</th></tr>
    <tr>
      
      <th> Title</th>
      <th>Amount</th>
     
      
    </tr>
  </thead>
  <tbody>
  {fdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item._id}</td>  
                            <td>{item.amount}</td>   
                        </tr>  
                    })}
                      <tr><td>Total(PKR)</td><td>{idata[0]?
sum2=fdata.map(item=>item.amount).reduce((a,item)=>item+a):0}
                    </td>
                    </tr>    
    
  </tbody>
</Table>
</td>
</tr>

<tr><h5>Total Income (PKR) :{ 
iSum=sum1+sum2}</h5></tr>
<br/>
<tr><td>
<Table  bordered size='sm'>
  <thead>
    <tr><th>Expense Report(-)</th></tr>
    <tr>
      
      <th> Title</th>
      <th>Amount</th> 
    </tr>
  </thead>
  <tbody>
  {edata.map(item => {  
                        return <tr key={item.t_id}> 
                            <td>{item._id}</td>  
                            <td>{item.amount}</td>   
                        </tr>  
                    })}
                    <tr><td>Total(PKR)</td><td>{edata[0]?sum3=edata.map(item=>item.amount).reduce((a,item)=>item+a):0}
                      </td></tr>  
    
  </tbody>
</Table>
</td><td>
<Table  bordered  size='sm'>
  <thead>
    <tr><th>Salary Report(-)</th></tr>
    <tr>
      
      <th> Title</th>
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
</td>
</tr>
<tr><h5>Total Expense (PKR) :{ 
eSum=sum3+sum4}</h5></tr><br/><br/>
<tr><h3>Total Revenue (PKR) :{ 
rSub=iSum-eSum}</h3></tr>
</tbody>
</Table>
 </div>
 </div> 
 </div> 
  </>

)
             
}
export default ReportFinanceRole