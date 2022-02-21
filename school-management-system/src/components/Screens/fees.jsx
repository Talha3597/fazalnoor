import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const Fee =  ()=> {
  var [today,setToday] =useState( new Date)
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  let[gdata,setData] =useState([]) 
let[month,setMonth] =useState(parseInt(today.getMonth()+1)) 
let[status,setStatus] =useState('') 
const [ studentNo, setStudentNo] = useState('')
const [ classData, setClassData ] = useState([])
const [ Class, setClass ] = useState('')
const [ section, setSection ] = useState('')    
const [ sectionData, setSectionData ] = useState([])
let createdBy=localStorage.getItem("username")
let role=localStorage.getItem("role")
const [ size, setSize ] = useState(50)
let [ page, setPage ] = useState(1)
let number=0
let[year,setYear] =useState( today.getFullYear())
const addNum=()=>{
  number=number+1;
  }
const minusPage=()=>{
  if(page>1)
  {
    setPage(page=>page-1)
  }
  }
const addPage=()=>{
  setPage(page=>page+1)
}
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
  {  const config= {
    headers:{
        
        Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        role:localStorage.getItem("role")
    }
}
const fetchPrivateData=async()=>
{
   
   try {
    const {data}=  (await axios.get('/api/private',config))
    console.log(data.data)
    await axios.delete(`/api/fee`, { params: {id} }) 
    .then(res => {
        const del = gdata.filter(gdata => id !== gdata._id)
        setData(del)
       
    }) 
         
    } catch (error) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("role")
        window.location="/login"
    }
}

fetchPrivateData()

    }
}
async function fetchData(){ 
          
  await axios.get('/api/fees', { params: {size,page,month,Class,section,status,studentNo,year} })
  .then(res=>{
      setData(res.data)
      
  })
 }
 useEffect(()=>{
  if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
  {  
      window.location="/login"
  }
},[])
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

axios.get('/api/fees', { params: {size,page,month,Class,section,status,studentNo,year} })
.then(res=>{
    setData(res.data)
    
})

},[month,status,Class,section,studentNo,year,size,page]
)
const generateDefaultFee = async()=>{
 let flag= window.confirm(`Generate Default Fee on ${date}`)
 if(flag)
 {  const config= {
  headers:{
      
      Authorization:`Bearer ${localStorage.getItem("authToken")}`,
      role:localStorage.getItem("role")
  }
}
const fetchPrivateData=async()=>
{
 
 try {
  const {data}=  (await axios.get('/api/private',config))
  await axios.post('/api/generateFee',{createdBy,date})
  fetchData()
       
  } catch (error) {
      localStorage.removeItem("authToken")
      localStorage.removeItem("role")
      window.location="/login"
  }
}

fetchPrivateData()

   
  }
  
 
 
}
const deleteRecord = async()=>{
  if(month && year ){
  let flag= window.confirm("Delete  record of specific month")
  if(flag)
  {  const config= {
    headers:{
        
        Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        role:localStorage.getItem("role")
    }
  }
  const fetchPrivateData=async()=>
  {
   
   try {
    const {data}=  (await axios.get('/api/private',config))
    await axios.delete('/api/deleteFee', { params: {month,year} })
    fetchData()
         
    } catch (error) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("role")
        window.location="/login"
    }
  }
  
  fetchPrivateData()
  
    
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
                    <select   as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                   
                    <option value='' >{year}</option>
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
                 
                  <select  as="select" value={status} onChange={ e => setStatus(e.target.value) } >
                    <option value=''defaultValue>Select status</option>
                    <option value='Paid'>Paid</option>
                    <option value='Unpaid'>Unpaid</option>
                   
                   
                  </select>&nbsp;
                  <select   as="select" value={Class} onChange={ e => setClass(e.target.value) } >
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
                                        <select as="select" value={section} onChange={ e => setSection(e.target.value) }>
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
                                        </select>&nbsp;
                                   <input   type="number" placeholder="Search Student Number" className={styles.sizeFilter} value={studentNo} onChange={ e => setStudentNo(e.target.value) } />&nbsp;
                                   <DatePicker
                                                selected={today}
                                                onChange={date => setToday(date)}
                                                className={styles.sizeFilter}
                                                 />                     
                   &nbsp;</div>

<div ref={componentRef} >
<div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Fee</h3>
                  </div>
 <h5>&nbsp; {studentNo ? "Student No:"+studentNo:
 <h5>&nbsp; {Class ? "Class:"+Class:''}&nbsp; {section ? "Section:"+section:''}&nbsp; {status? "Status:"+status:''}&nbsp; {month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
 }</h5>
                    <div className='text-right'>
                   <div className={styles.noprint}>
page:{page}&nbsp;<AiIcons.AiFillPlusCircle onClick={ addPage}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusPage}/>&nbsp;
<select   as="select" value={size} onChange={ e => setSize(e.target.value) } >
                                         <option value='50' defaultValue>50</option>
                                         <option value='100' >100</option>
                                         <option value='150' >150</option>
                                         <option value='200' >200</option>
                                         <option value='500' >500</option>
                                         </select>&nbsp;</div></div>
<br/>
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'  >
  <thead>
    <tr>
      <th>#</th>
      <th>Student #</th>
      <th>Student Name</th>
      <th> Title</th>
      <th>Invoice #</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Paid</th>
      <th>Status</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                             <td onClick={addNum()}>{number}</td> 
                            <td>{item.studentNo}</td> 
                            <td>{item.studentName}</td> 
                            <td>{item.title}</td>  
                            <td>{item.invoiceNo}</td>  
                            <td>{item.amount}</td>  
                            <td>{item.date}</td> 
                            <td>{item.pending}</td>
                            <td>{item.status}</td>
                            <td className={styles.noprint}>  {role=='superAdmin'?
                        <AiIcons.AiFillDelete className={styles.sideButton2} onClick={() => removeData(item._id)}/>:''}</td><td className={styles.noprint}>
                        <Link to={`/payFee/${item._id}` } ><AiIcons.AiOutlineDollarCircle className={styles.sideButton3}  /></Link> </td>
                            
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