import React, { useState, useEffect, useRef } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';


const ClassVar = props => (
      
    <tbody>
        <tr>
            <td>{props.classIns.student_name}</td>
            <td>{props.classIns.student_admin_no}</td>
            <td>{props.classIns.title}</td>
            <td>{props.classIns.totalMarks}</td>
            <td>{props.classIns.obtainedMarks}</td>
            <td>{props.classIns.percentage}</td>
            <td>{props.classIns.testGrade}</td>
        </tr>

    </tbody>
        
    
)

function GradeReportByClass() {

    const { classTitle, examTitle } = useParams()
    const [ studentGrades, setStudentGrades ] = useState([])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const classSectionDataList = () => {
        return studentGrades.map((currentclass) => {
          return <ClassVar classIns={currentclass} key={currentclass._id}/>;
        })
    }
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    useEffect(() => {
        axios.get('/api/classGrades/' + classTitle + '/' + examTitle)
        .then(res => {
            console.log(res.data)
            setStudentGrades(res.data)
        })
        .catch(err => console.log('error : ' + err))

    }, [classTitle,examTitle])


    return (
        <>

        <Navbar className={styles.respNav} expand="lg">
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color: '#ffffff'}}/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

        <div className={styles.overflow}>
            <div className={styles.background}>
                <div className={styles.topSet}>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                </div>
            </div>

            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                         

                        

                        <Row>
                            <Col>

                            
                                <div ref={componentRef} >
                                    <br/>
                                    <h1 className={styles.credStyle}>Class : {classTitle}</h1>
                                    <h1 className={styles.credStyle}>Exam : {examTitle}</h1>


                                    <br/>


                                    <div className={styles.tableMargin}>
                                        <Table className={styles.tableWidth} hover responsive='sm'>
                                            <thead>
                                                <tr>
                                                <th>Student Name</th>
                                                <th>Admin No</th>
                                                <th>Exam Title</th>
                                                <th>Total Marks</th>
                                                <th>Obtained Marks</th>
                                                <th>Percentage</th>
                                                <th>Grade</th>
                                                
                                                </tr>
                                            </thead>

                                            {classSectionDataList()}
                                            
                                        </Table>
                                    </div>

                                </div>
                                
                                <br/><br/>

                                <Button style={{marginLeft: '10%'}} onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                    Print Now
                                </Button>
                            </Col>
                            
                        </Row>
                        
                        
                        
                    </Col>

                </Row>
            </div>
        </div>
        
        
        </>
    )
}

export default GradeReportByClass