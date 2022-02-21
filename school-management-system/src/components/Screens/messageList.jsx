import React ,{ useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const MessageList =()=>{
let[gdata,setData] =useState([]) 
const sam=''

const removeData = async(id) => {
    await axios.delete(`/api/message`, { params: {id} }) 
        .then(res => {
            const del = gdata.filter(gdata => id !== gdata._id)
            setData(del)
           
        }) 
}
useEffect(()=>{
    if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
    {  
        window.location="/login"
    }
},[])
useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/messages')
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
                            <h1>MessageList</h1>
                        </div></Col>
       </Row>
     
       <div className='table-responsive'>
       <Table striped bordered hover size='sm'>
  <thead>
    <tr>
      <th>To</th>
      <th>Text</th>
      <th>Date</th>
     
      
    </tr>
  </thead>
  <tbody>
  {gdata.map(item => {  
                        return <tr key={item._id}> 
                            <td>{item.to}</td>  
                            <td>{item.text}</td>  
                            <td>{item.date}</td>  
                             
                            
                            <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                             Delete
                            </Button>
                        </tr>  
                    })}  
    
  </tbody>
</Table>

       </div>
    </div>
    
       </>
)

}
export default MessageList
