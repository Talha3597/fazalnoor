import React ,{ useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
let role=localStorage.getItem("role") 

//import axios from 'axios'
const Students =()=>{
let[gdata,setData] =useState([]) 
const [search,setSearch]=useState("")
const [ studentNo, setStudentNo] = useState('')
const [ classData, setClassData ] = useState([])
const [ Class, setClass ] = useState('')
const [ section, setSection ] = useState('')    
const [ sectionData, setSectionData ] = useState([])

const removeData = async(id) => {
  let flag= window.confirm("Delete  record!")
  if(flag)
  {   await axios.delete(`/api/student`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) }
}
const deleteRecord = async()=>{
  if(section ){
  let flag= window.confirm(`Delete  record of ${section} `)
  if(flag)
  { 
    await axios.delete('/api/deleteSection', { params: {section} })
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

  axios.get('/api/getSections')
  .then((res) => {
      
      setSectionData(res.data)
      
  })
  .catch(err => {
console.log(err)
})

    async function fetchData(){   
        await axios.get('/api/students', { params: {search,Class,section,studentNo} })
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()
 

},[search,Class,section,studentNo]
)
return(
    <>
           
     
    
  
    <div className={styles.margLeftRowTable }>
    <div className={styles.empty}></div>
    <div className='text-center'>  &nbsp;
                            {role=='superAdmin'? <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button>:''} &nbsp;     
       <input type="text" placeholder="Search by Name.." value={search} onChange={e=>setSearch(e.target.value)}/>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
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
                       &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
</div>
    <div ref={componentRef1}>
    <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Students List</h3>
                  </div>
  
<br/>
<h5>&nbsp; {studentNo ? "Student No:"+studentNo:
<h5>&nbsp; {Class ? "Class:"+Class:''}&nbsp; {section ? "Section:"+section:''}&nbsp; &nbsp; </h5>
}&nbsp;</h5>
<br/>
       <div className='table-responsive'>
    
       
       <Table striped bordered hover size='sm' >
       
  <thead >
    <tr>
      <th>Student Number</th>
      <th> Name</th>
      <th>Guardian</th>
      <th>Class</th>
      <th>Section</th>
    
      <th>Phone Number</th>
      <th>Address</th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
      <th className={styles.noprint}></th>
    </tr>
  </thead>
  <tbody >
  {gdata.map((item,idx) => {  
                        return <tr key={item._id}>
                          
                            <td>{item.studentNo}</td> 
                            <td>{item.studentName}</td>  
                            <td>{item.parentName}</td>  
                            <td>{item.Class}</td>  
                            <td>{item.section}</td>  
                            <td>{item.phoneNo}</td>  
                            <td>{item.address}</td>
                              {role=='superAdmin'?
                          <td className={styles.noprint}><Link  to={`/updateStudent/${item._id}`}>  
                            <Button className={styles.sideButton1}  >
                            Edit</Button></Link></td>:''}
                            {role=='superAdmin'?  <td className={styles.noprint}>
                           <Button className={styles.sideButton2}  onClick={() => removeData(item._id)}>
                             Delete
                            </Button></td>:''}
                            
                            <td className={styles.noprint}> <Link to={ `/viewStudent/${item._id}` }> <Button className={styles.sideButton3}  >
                            View</Button></Link></td>
                            {role=='superAdmin'|| role=='finance'||role=='financeTeacher'||role=='adminFinance'? <td className={styles.noprint}>
                            <Link to={`/addFeeStudent/${item.studentNo}`}>
                        <Button className={styles.sideButton1}>Fee</Button></Link></td> :''}
                        <td className={styles.noprint}>
                          <Link to={`/viewGradesStudent/${item.studentNo}`}>
                        <Button className={styles.sideButton3} >
                         Grades
                        </Button></Link></td>  
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