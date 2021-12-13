import React ,{ useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom'
import axios from 'axios';

//import axios from 'axios'
const Notices =()=>{
let[gdata,setData] =useState([]) 
const sam=''
let role=localStorage.getItem("role")
//const  [query ,setQuery ]= useState('')
const removeData = async(id) => {
    let flag= window.confirm("Delete  record!")
    if(flag)
    {   await axios.delete(`/api/notice`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) }
}

useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/notices')
        .then(res=>{
            setData(res.data)
            
        })
       }
       
 fetchData()
 

},[sam]
)
return(
    <>
   
    <div className={styles.margLeftRowTable }>
     
       <Row>
           <Col><div className={styles.backBar}>
                            <h1>Notices List</h1>
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
                            {role=="superAdmin"?
                           <td><Link to={`/updateNotice/${item._id}` }> <Button className={styles.sideButton1}   >
                            Edit</Button></Link></td>:''}
                           {role=="superAdmin"?
                           <td> <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                             Delete
                            </Button></td>:''}
                            <td><Link to={`/viewNotice/${item._id}` }><Button className={styles.sideButton3}   >
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
export default Notices
