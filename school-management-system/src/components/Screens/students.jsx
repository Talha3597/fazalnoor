import React ,{ useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai'; 
let role=localStorage.getItem("role") 

//import axios from 'axios'
const Students =()=>{
let[gdata,setData] =useState([]) 
const [search,setSearch]=useState('')
const [ studentNo, setStudentNo] = useState('')
const [ classData, setClassData ] = useState([])
const [ Class, setClass ] = useState('')
const [ section, setSection ] = useState('')
const [ size, setSize ] = useState(50)
let [ page, setPage ] = useState(1)

const [ sectionData, setSectionData ] = useState([])
let number=0;
const removeData = async(id) => {
  let flag= window.confirm("Delete  record!")
  if(flag)
  {   await axios.delete(`/api/student`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) }
}
const addNum=()=>{
number=number+1;
}
const minusYear=()=>{
  if(page>1)
  {
    setPage(page=>page-1)
  }
  }
const addYear=()=>{
  setPage(page=>page+1)
}
const deleteRecord = async()=>{
  if(section ){
  let flag= window.confirm(`Delete  record of ${section} `)
  if(flag)
  { 

    await axios.delete('/api/deleteSection', { params: {section} })
    fetchData()
  }
}else{
  window.alert('Select section to delete record')
}
  
  
 }
const componentRef1 = useRef();


const handlePrint = useReactToPrint({
  content: function() {return  componentRef1.current},
  documentTitle:"Students List Fazal Noor"
});
useEffect(()=>{
  axios.get('/api/getClasses')
  .then((res) => {
     
      setClassData(res.data)
  })
  .catch(err => {
console.log(err)
})
},[])
useEffect(()=>{
  axios.get('/api/getSections')
  .then((res) => {
      
      setSectionData(res.data)
      
  })
  .catch(err => {
console.log(err)
})
},[])
 function fetchData(){   
   axios.get('/api/students', { params: {search,Class,section,studentNo,size,page} })
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
  axios.get('/api/students', { params: {search,Class,section,studentNo,size,page} })
  .then(res=>{
      setData(res.data)
      
  })
},[search,Class,section,studentNo,size,page]
)
return(
    <>
    <div className={styles.margLeftRowTable }>
    <div className={styles.empty}></div>
    <div className='text-center'>
     {role==='superAdmin' && <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button>} &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">Print</button>
                            &nbsp;<input className={styles.sizeFilter} type="text" placeholder="Search by Name.." value={search} onChange={e=>setSearch(e.target.value)}/>
       &nbsp;<input className={styles.sizeFilter} type="number" placeholder="Search Student #" value={studentNo} onChange={ e => setStudentNo(e.target.value) } />
       &nbsp;<select className={styles.sizeFilter}  as="select" value={Class} onChange={ e => setClass(e.target.value) } >
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
                                       &nbsp;<select className={styles.sizeFilter} as="select" value={section} onChange={ e => setSection(e.target.value) } >
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
                                       </select>                   
</div>
    <div ref={componentRef1}>
    <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Students List</h3>
                  </div>
  

<h5>&nbsp; {studentNo ? "Student No:"+studentNo:
<h5>&nbsp; {Class ? "Class:"+Class:''}&nbsp; {section ? "Section:"+section:''}&nbsp; &nbsp; </h5>
}</h5>
<div className='text-right'>
  <div className={styles.noprint}>
page:{page}&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/>&nbsp;
<select   as="select" value={size} onChange={ e => setSize(e.target.value) } >
                                         <option value='50' defaultValue>50</option>
                                         <option value='100' >100</option>
                                         <option value='150' >150</option>
                                         <option value='200' >200</option></select>&nbsp;</div></div>
       <div className='table-responsive'>
       <Table striped bordered hover size='sm' >
  <thead >
    <tr>
      <th>#</th>
      <th>Student #</th>
      <th> Name</th>
      <th>Class</th>
      <th>Section</th>
      <th>Phone #</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
    </tr>
  </thead>
  <tbody >
  {gdata.map((item) => {  
                        return <tr key={item._id}>
                          <td onClick={addNum()}>{number}</td>
                            <td>{item.studentNo}</td> 
                            <td>{item.studentName}</td>  
                            <td>{item.Class}</td>  
                            <td>{item.section}</td>  
                            <td>{item.phoneNo}</td>  
                              {role==='superAdmin'&&
                          <td className={styles.noprint}><Link  to={`/updateStudent/${item._id}`}>  
                            <AiIcons.AiOutlineEdit className={styles.sideButton1}/></Link></td>}
                            {role==='superAdmin'&& <td className={styles.noprint}>
                           <AiIcons.AiFillDelete className={styles.sideButton2}  onClick={() => removeData(item._id)}/></td>}
                            <td className={styles.noprint}> <Link to={ `/viewStudent/${item._id}` }> <AiIcons.AiOutlineFolderView className={styles.sideButton6}  /></Link></td>
                            {role==='superAdmin'|| role==='finance'||role==='financeTeacher'||role==='adminFinance' ? <td className={styles.noprint}>
                            <Link to={`/addFeeStudent/${item.studentNo}`}>
                        <AiIcons.AiOutlineDollarCircle className={styles.sideButton3}/></Link></td>:''}
                        <td className={styles.noprint}>
                          <Link to={`/viewGradesStudent/${item.studentNo}`}>
                        <AiIcons.AiOutlinePercentage className={styles.sideButton7} /></Link></td>  
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
export default Students