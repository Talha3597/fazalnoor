import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';

 


const Fee =  ()=> {
   // const [message, setMessage]=useState("")
 var today = new Date()
 let[year,setYear] =useState( today.getFullYear())
let sum4=0
let[gdata,setData] =useState([]) 
let[month,setMonth] =useState('') 
let[status,setStatus] =useState('') 
const [ studentNo, setStudentNo] = useState('')
const [ classData, setClassData ] = useState([])
const [ Class, setClass ] = useState('')
const [ section, setSection ] = useState('')    
const [ sectionData, setSectionData ] = useState([])
//const  [query ,setQuery ]= useState('')
// if(status=='Paid'){
//           const del = gdata.filter(gdata =>  gdata.pending== gdata.amount)
//           setData(del)   
// }
// else if(status=='Unpaid'){
//   const del = gdata.filter(gdata => gdata.pending!= gdata.amount)
//   setData(del)
// }
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
const minusYear=()=>{
  setYear(year=>year-1)
  }
const addYear=()=>{
  setYear(year=>year+1)
}
useEffect(()=>{
  axios.get('/api/getClasses')
  .then((res) => {
     
      setClassData(res.data)
  })
  .catch(err => {
console.log(err)
})

  axios.get('/api/getSections')
  .then((res) => {
      
      setSectionData(res.data)
      
  })
  .catch(err => {
console.log(err)
})

    async function fetchData(){ 
          
        await axios.get('/api/feeReportExpensive', { params: {month,Class,section,studentNo,year} })
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
                   <button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button> &nbsp;
                    <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                   
                    <option value='' defaultValue>Select Month</option>
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
                    </select>&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;
                 
                                
</div>
<br/>
<div ref={componentRef} >
<div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Fee Report</h3><div className='fakeimg4' >
        <Image src='/images/fn.jpeg' alt='Fazal Noor School' fluid />
     </div>
                  </div>
 <h5>&nbsp; {Class ? "Class:"+Class:''}&nbsp; {section ? "Section:"+section:''}&nbsp; {studentNo ? "Student No:"+studentNo:''}&nbsp; {month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
                            
       <br/><br/>
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Student Number</th>
      <th>Amount</th>
      <th>Paid</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item._id}</td> 
                            <td>{item.amount}</td>  
                            <td>{item.pending}</td>
                            <td>{item.pending==item.amount?"Paid":"Unpaid"}</td>
                            
                               </tr> 
                        
                    })}  <tr><td>Total Piad(PKR)</td><td>{gdata[0]?
                      sum4=gdata.map(item=>item.pending).reduce((a,item)=>item+a):0}</td></tr>  
    <tr><td>Total Amount(PKR)</td><td>{gdata[0]?
sum4=gdata.map(item=>item.amount).reduce((a,item)=>item+a):0}</td></tr>  
                          
    
  </tbody>
</Table>
       </div>
    </div>
    </div>
   

  </>
)
             
}
export default Fee