import React ,{ useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
//import axios from 'axios'
const Homeworks =()=>{
let[gdata,setData] =useState([]) 
const sam=''
let role=localStorage.getItem("role")
//const  [query ,setQuery ]= useState('')
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

useEffect(async()=>{
   
        if(role=='teacher' || role=='financeTeacher'){
        const Class= localStorage.getItem("Class")  
        const section= localStorage.getItem("section")  
        await axios.get('/api/homeworks', { params: {Class,section} })
        .then(res=>{
            setData(res.data)
            
        })
       }else{
   
        const Class= '' 
        const section= ''
       
        await axios.get('/api/homeworks',{ params: {Class,section} })
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
                           <td><Link to={`/updateHomework/${item._id}` }> <Button className={styles.sideButton1}   >
                            Edit</Button></Link></td>:''}
                            {role!="student"?<td> <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                             Delete
                            </Button></td>:''}
                            <td> <Link to={`/viewHomework/${item._id}` }><Button className={styles.sideButton3}  >
                            View</Button></Link></td>
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
