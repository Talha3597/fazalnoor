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