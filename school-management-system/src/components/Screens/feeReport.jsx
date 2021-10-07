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


},[month,Class,section,studentNo,year]
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
                    <option value=''>{year}</option>
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
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;
                 
                  <select required  as="select" value={status} onChange={ e => setStatus(e.target.value) } >
                    <option value=''defaultValue>Select status</option>
                    <option value='Paid'>Paid</option>
                    <option value='Unpaid'>Unpaid</option>
                   
                   
                  </select>&nbsp;
                  <select required  as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option value='' defaultValue>Select Class</option>
                                            {   
                                                 classData.map((classIns) => {
                                                     return <option 
                                                        key={classIns._id}
                                                        value={classIns.title}>
                                                            {classIns.title}
                                                    </option>;
                                                    })
                                            }
                                        </select>
                                   
                                        &nbsp;
                                        <select as="select" value={section} onChange={ e => setSection(e.target.value) } required >
                                        <option value='' defaultValue>Select Section</option>
                                            {
                                                 sectionData.map((section) => {
                                                     return <option 
                                                        key={section._id}
                                                        value={section.title}>
                                                            {section.title}
                                                    </option>;
                                                    })
                                            }
                                        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   
                                       
                       
                        <input   type="number" placeholder="Search Student Number" value={studentNo} onChange={ e => setStudentNo(e.target.value) } />
                        
                                
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
    <tr><td>Total Pending(PKR)</td><td>{gdata[0]?
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