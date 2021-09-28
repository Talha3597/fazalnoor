import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';

 


const Fee =  ()=> {
 
let[gdata,setData] =useState([]) 
let[month,setMonth] =useState('') 
let[status,setStatus] =useState('') 
const [ studentNo, setStudentNo] = useState('')
const [ classData, setClassData ] = useState([])
const [ Class, setClass ] = useState('')
const [ section, setSection ] = useState('')    
const [ sectionData, setSectionData ] = useState([])
let createdBy=localStorage.getItem("username")
let role=localStorage.getItem("role")
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
const removeData = async(id) => {
  let flag= window.confirm("Delete  record!")
  if(flag)
  { 
    await axios.delete(`/api/fee`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) }
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
          
        await axios.get('/api/fees', { params: {month,Class,section,status,studentNo,year} })
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()


},[month,status,Class,section,studentNo,year]
)
const generateDefaultFee = async()=>{
 let flag= window.confirm("Generate Default Fee for All Students")
 if(flag)
 { 
   await axios.post('/api/generateFee',{createdBy})
 }
  
 
 
}
const deleteRecord = async()=>{
  if(month && year ){
  let flag= window.confirm("Delete  record of specific month")
  if(flag)
  { 
    await axios.delete('/api/deleteFee', { params: {month,year} })
  }
}else{
  window.alert('Select month to delete Paid record')
}
  
  
 }


return (
 <>
 

                          
   
        <div className={styles.margLeftRowTable }>
       <br/>
       <div className="text-center">
            
                     &nbsp;
        <button className={styles.formButton} onClick={() => window.location="/addFee"}>
                    
        &nbsp;   Add Fee   &nbsp;
        </button>
        &nbsp;
        <button className={styles.formButton} onClick={() => generateDefaultFee()}>
        <span>&#9888; </span> Generate Default Fee
                            </button> &nbsp;
                            {role=='superAdmin'? <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button>:''} &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button><br/>      
                    <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                   
                    <option value='' defaultValue>Select Month</option>
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
<div ref={componentRef} >
<div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Fee</h3>
                  </div>
 <h5>&nbsp; {Class ? "Class:"+Class:''}&nbsp; {section ? "Section:"+section:''}&nbsp; {studentNo ? "Student No:"+studentNo:''}&nbsp; {status? "Status:"+status:''}&nbsp; {month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
 
<br/>
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Student Number</th>
      <th>Student Name</th>
      <th> Title</th>
      <th>Invoice Number</th>
      <th>Amount</th>
      <th>Discount</th>
      <th>Class</th>
      <th>section</th>
      <th>Date</th>
      <th>Paid</th>
      <th>person</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.studentNo}</td> 
                            <td>{item.studentName}</td> 
                            <td>{item.title}</td>  
                            <td>{item.invoiceNo}</td>  
                            <td>{item.amount}</td>  
                            <td>{item.discount}</td>
                            <td>{item.Class}</td>  
                            <td>{item.section}</td>  
                            <td>{item.date}</td> 
                            <td>{item.pending}</td>
                            <td>{item.person}</td>
                            <td>{item.status}</td>
                            <td>  {role=='superAdmin'?
                        <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                         Delete
                        </Button>:''}
                        <Link to={`/payFee/${item._id}` } ><Button className={styles.sideButton1}  >
                        Pay</Button></Link> </td>
                            
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
export default Fee