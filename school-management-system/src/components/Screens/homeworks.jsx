import React ,{ useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
const Homeworks =()=>{
let[gdata,setData] =useState([]) 
const sam=''
let role=localStorage.getItem("role")
const removeData = async(id) => {
    let flag= window.confirm("Delete  record!")
  if(flag)
  { 
    await axios.delete(`/api/homework`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) }
}
useEffect(()=>{
  if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
  {  
      window.location="/login"
  }
},[])
useEffect(()=>{
   
        if(role=='teacher' || role=='financeTeacher'){
        const Class= localStorage.getItem("Class")  
        const section= localStorage.getItem("section")  
         axios.get('/api/homeworks', { params: {Class,section} })
        .then(res=>{
            setData(res.data)
            
        })
       }else{
   
        const Class= '' 
        const section= ''
       
         axios.get('/api/homeworks',{ params: {Class,section} })
        .then(res=>{
            setData(res.data)
            
        })
       }
         
 

},[sam]
)
return(
    <>
   
   
    <div className={styles.margLeftRowTable }>
         <Row>
           <Col><div className={styles.backBar}>
                            <h1>Homeworks List</h1>
                        </div></Col>
       </Row>
     
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>Title</th>
      <th>Class</th>
      <th>Section</th>
      <th>Status</th>
      <th></th>    
      <th></th>    
      <th></th>    
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.title}</td> 
                            <td>{item.Class}</td>  
                            <td>{item.section}</td>  
                            <td>{item.status}</td>  
                            {role!="student"?  
                           <td><Link to={`/updateHomework/${item._id}` }> <AiIcons.AiOutlineEdit className={styles.sideButton1}   /></Link></td>:''}
                            {role!="student"?<td> <AiIcons.AiFillDelete className={styles.sideButton2} onClick={() => removeData(item._id)}/></td>:''}
                            <td> <Link to={`/viewHomework/${item._id}` }><AiIcons.AiOutlineFolderView className={styles.sideButton6}  /></Link></td>
                        </tr>  
                    })}  
    
  </tbody>
</Table>
       </div>
    </div>
       </>
)

}
export default Homeworks
