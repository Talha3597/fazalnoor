import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios'

const ReportClassFee =  ()=> {
   // const [message, setMessage]=useState("")
let sum1 =0

let[f1data,setFee1Data] =useState([]) 

let[month,setMonth] =useState('') 
let today =new Date()
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
 
    async function fetchFee1Data(){   
        await axios.get('/api/feeR2f1', { params: {month,year} })
        .then(res=>{
            setFee1Data(res.data)
            
        })
       }
       
       
 fetchFee1Data()
 
 


},[month,year]
)

return (
 <>
 

                          
   
        <div className={styles.margLeftRowTable }>
        <br/>
                   
                   <div className="text-center">
                   
                   <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''selected>Select Month</option>
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
                 
</div><div ref={componentRef} ><div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Class Fee Report</h3>    <div className='fakeimg4' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
                 </div>
    
                 <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
  
       
       <div className={styles.tableMarginFormal}>
<Table striped bordered hover size='sm'>
  <thead>
    <tr>
      
      <th> Title</th>
      <th>Amount</th>
     
      
    </tr>
  </thead>
  <tbody>
  {f1data.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item._id}</td>  
                            <td>{item.amount}</td>   
                        </tr>  
                    })}  
    
  </tbody>
</Table>
<div className="text-center">
<h3> Paid Fee &nbsp;{f1data[0]? 
sum1=f1data.map(item=>item.amount).reduce((a,item)=>item+a):0} </h3> </div>
<br/>



       </div>
    </div>
    </div>
  </>
)
             
}
export default ReportClassFee