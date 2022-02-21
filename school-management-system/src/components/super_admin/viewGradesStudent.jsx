
import React, { useState,useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';
function ViewGradesStudent({match}){
    const {id} = useParams();
    const [ admin_no, setAdminNo ] = useState(id)
    const [ student, setStudent ] = useState({})
    const [ studentGrades, setStudentGrades ] = useState([])

    const classSectionDataList = () => {
        return studentGrades.map((currentclass) => {
          return <ClassVar classIns={currentclass} key={currentclass._id}/>;
        })
    }
    const ClassVar = props => (
      
        <tbody>
            <tr>
                <td>{props.classIns.title}</td>
                <td>{props.classIns.totalMarks}</td>
                <td>{props.classIns.obtainedMarks}</td>
                <td>{props.classIns.percentage}</td>
                <td>{props.classIns.testGrade}</td>
                <td><Link to={'/updateGrade/' + props.classIns._id}><AiIcons.AiOutlineEdit className={styles.sideButton1}/></Link>
               </td><td> <AiIcons.AiFillDelete onClick={() =>  { let flag= window.confirm("Delete  record!")
      if(flag)
      {  axios.delete('/api/deleteGrade/'+props.classIns._id)
                       .then(res => { 
                        const del = studentGrades.filter(studentGrades => props.classIns._id !== studentGrades._id)
                        setStudentGrades(del)
                        })
                    }
                }} className={styles.sideButton2}/></td>
            </tr>
    
        </tbody>
            
        
    )
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
useEffect(()=>{
    axios.get('/api/singleStudentByRoll/' + admin_no)
    .then(res => {
        console.log(res.data)
        setStudent(res.data)
    })
    .catch(err => console.log('error : ' + err))

    
    axios.get('/api/getStudentGrades/' + admin_no)
        .then(res => {
            console.log(res.data)
            setStudentGrades(res.data)
        })
        .catch(err => console.log('error : ' + err))

},[admin_no])
   



    return (
        <>
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Student Grade</h1>
                                </div>

                                <br/>



                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col> 
                                <br/>
                                <h1 className={styles.credStyle}>Name : {student.studentName}</h1>
                                <h1 className={styles.credStyle}>Admin No : {student.studentNo}</h1>

                                <br/>


                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} bordered hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th>Exam Title</th>
                                                <th>Total Marks</th>
                                                <th>Obtained Marks</th>
                                                <th>Percentage</th>
                                                <th>Grade</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        {classSectionDataList()}
                                        
                                    </Table>
                                </div>
                                <br/><br/>

                                <Link style={{height: '45px'}} className={styles.addSecButton} to={ '/gradeReport/' + admin_no }>Print Report</Link>
                            </Col>
                            
                        </Row>
                        
                        
                        
                    </Col>

                </Row>
            </div>
        
        
        
        </>
    )
}

export default ViewGradesStudent