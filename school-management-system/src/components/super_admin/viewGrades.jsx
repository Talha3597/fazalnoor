import React, { useState,useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Button, Form, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'




function ViewGrades() {

    const [ admin_no, setAdminNo ] = useState('')
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
                <td><Link to={'/updateGrade/' + props.classIns._id}><span className={[styles['Edel'], 'fas fa-pencil-alt'].join(' ')}></span></Link>
                <button onClick={() =>  {let flag= window.confirm("Delete  record!")
      if(flag)
      {
                       axios.delete('/api/deleteGrade/'+props.classIns._id)
                       .then(response => { 
                        const del = studentGrades.filter(studentGrades => props.classIns._id !== studentGrades._id)
                        setStudentGrades(del)
                        });}
                }} className={styles.Edel2}><span className={[styles['Edel3'], 'fas fa-trash'].join(' ')}></span></button></td>
            </tr>
    
        </tbody>
            
        
    )
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    const onSubmit = (e) => {
        e.preventDefault()

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

    }



    return (
        <>

 

        <div className={styles.overflow}>
           

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

                            <div className={styles.formStyle}>
                                    
                                        <br/>
                                        <form name="classForm" className={styles.formMargin} onSubmit={onSubmit} noValidate>

                                            <Form.Group>
                                                <Form.Label>Student Admin No</Form.Label>
                                                <Form.Control className={styles.formField} type="text" placeholder="Enter Admin No" value={admin_no} onChange={ e => setAdminNo(e.target.value) } required/>
                                                <Form.Text id="admin_no" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide Admin No of Student.
                                                </Form.Text>
                                                <Form.Text id="titleCheck" className={styles.authtextF1} style={{display: 'none'}}>
                                                    You have already Updated Grade for this exam.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button className={styles.formButton} type="submit">
                                                
                                                View Grade
                                            </Button>
                                            
                                        </form>

                                        <br/>
                                    
                                    
                                </div>
                                
                                <br/>
                                {student && <div> <h1 className={styles.credStyle}>Name : {student.studentName}</h1>
                                <h1 className={styles.credStyle}>Admin No : {student.studentNo}</h1> </div>}

                               
                                <br/>


                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th>Exam Title</th>
                                                <th>Total Marks</th>
                                                <th>Obtained Marks</th>
                                                <th>Percentage</th>
                                                <th>Grade</th>
                                                <th>Actions</th>
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
        </div>
        
        
        </>
    )
}

export default ViewGrades