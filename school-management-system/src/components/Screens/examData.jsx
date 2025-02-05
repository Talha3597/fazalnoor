import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'

const Exam =  ({})=> {
    const [ examData, setExamData ] = useState([])
    let [ Class, setClass ] = useState('')
    let [ section, setSection ] = useState('')
    let role=localStorage.getItem("role") 

    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    const removeData = async(id) => {
        let flag= window.confirm("Delete All grades with this title record!")
        if(flag)
        { 
          await axios.delete(`/api/exam`, { params: {id} }) 
              .then(res => {
                  const del = examData.filter(gdata => id !== gdata._id)
                  setExamData(del)
                 
              }) }
      }
      
  
   useEffect(() => {
    
   if(role=='teacher' || role=='adminTeacher' || role=='financeTeacher'){
       const Class=''
       const section=localStorage.getItem("section")
    axios.get('/api/exams' ,{ params: {Class,section} })
    .then((res) => {
        
        setExamData(res.data)
        
    })
    .catch(err => {
        console.log(err)
    })
   
}
else{
    axios.get('/api/exams' ,{ params: {Class,section} })
    .then((res) => {
        
        setExamData(res.data)
        
    })
    .catch(err => {
        console.log(err)
    })
}
      

        
}, [])


    return (
        <>

        
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1> Exams </h1>
                        </div>
                        
                        <div className={styles.formStyle}>
               

                            <div className={styles.Border}>
                               
                                <Table striped bordered hover size='sm'>
                                    <thead>
                                     <th>Exam Title</th>
                                     <th>Class</th>
                                     <th>Section</th>
                                     <th></th>
                                     <th></th>
                                    </thead>
                                    <tbody>
                                    
                                        {
                                            examData.map(item=>{return(<tr key={item._id}>
                                                <td>{item.title}</td>
                                                <td>{item.Class}</td>
                                                <td>{item.section}</td>
                                                <td> <AiIcons.AiFillDelete className={styles.sideButton2} onClick={() => removeData(item._id)}/></td><td>
                        <Link to={`/gradeReportBySection/${item.Class}/${item.title}/${item.section}` }><AiIcons.AiOutlineFolderView className={styles.sideButton6}   /></Link>
                        </td>
                                            </tr>)})
                                        }

                                    </tbody>
                                </Table>
                                <br/>
                            </div>
                            
                        </div>
                    </Col>

                </Row>
            </div>
        
        
        

        
        </>
    )
}

export default Exam