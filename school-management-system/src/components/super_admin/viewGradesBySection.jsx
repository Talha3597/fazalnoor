import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Button, Form, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'


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
            <td><Link to={'/updateGrade/' + props.classIns._id}><span className={[styles['Edel'], 'fas fa-pencil-alt'].join(' ')}></span></Link>
            <button onClick={() =>  {let flag= window.confirm("Delete  record!")
  if(flag)
  {
                   axios.delete('/api/deleteGrade/'+props.classIns._id)
                   .then(response => { 
                       console.log(response.data)
                       window.location = '/viewGrades'
                    });}
            }} className={styles.Edel2}><span className={[styles['Edel3'], 'fas fa-trash'].join(' ')}></span></button></td>
        </tr>

    </tbody>
        
    
)

function ViewGradesBySection() {

    const [ classTitle, setClass ] = useState('')
    const [ sectionTitle, setSection ] = useState('')
    const [ examTitle, setExam ] = useState('')
    const [ studentGrades, setStudentGrades ] = useState([])
    const [ stclassData, setClassTitle ] = useState([])
    const [ sectionData, setSectionTitle ] = useState([])
    const [ grades, setGrades ] = useState([])
    const [ title, setTitle ] = useState([])
let Class=classTitle
let section=sectionTitle

    const classSectionDataList = () => {
        return studentGrades.map((currentclass) => {
          return <ClassVar classIns={currentclass} key={currentclass._id}/>;
        })
    }

    useEffect(async() => {
        
       await axios.get('/api/getClasses')
        .then((res) => {
            console.log(res.data)
            setClassTitle(res.data)
            setClass(res.data[0].title)
            
            axios.get('/api/changeSections/' + res.data[0].title)
            .then((res) => {
                console.log(res.data)
                setSectionTitle(res.data)
                setSection(res.data[0].title)


                axios.get('/api/GradeTitles/' + res.data[0].title)
                    .then((res) => {
                        console.log(res.data)
                        setGrades(res.data)
                        
                    })
                    .catch(err => {
                        console.log(err)
                    })
                
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })

        

       
    }, [])
    useEffect(async() => {
        axios.get('/api/exams',{params:{Class,section}})
        .then((res) => {
            console.log(res.data)
            setTitle(res.data)
            setExam(res.data[0].title)
        })
        .catch(err => {
            console.log(err)
        })
    }, [Class,section])
    const changeSections = async(e) => {
        setClass( e.target.value )

       await axios.get('/api/changeSections/' + e.target.value)
        .then((res) => {
            console.log(res.data)
            setSectionTitle(res.data)
            setSection(res.data[0].title)
        })
        .catch(err => {
            console.log(err)
        })

    }

    const changeExams = async(e) => {
        setSection( e.target.value )
       await axios.get('/api/GradeTitles/' + e.target.value)
        .then((res) => {
            console.log(res.data)
            if(res.data.length == 0){
                setExam('')
            }
            
            setGrades(res.data)
            setExam(res.data[0].title)
        })
        .catch(err => {
            console.log(err)
        })
    }


    const onSubmit = (e) => {
        e.preventDefault()

        axios.get('/api/classGradesBySection/' + classTitle + '/' + examTitle + '/' + sectionTitle)
        .then(res => {
            console.log(res.data)
            setStudentGrades(res.data)
        })
        .catch(err => console.log('error : ' + err))


    }



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
                                <div className={styles.backBar}>
                                    <h1>Section Wise Grades</h1>
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

                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Select Class</Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={classTitle} onChange={ changeSections } required>
                                                    {
                                                            stclassData.map((classIns) => {
                                                                return <option 
                                                                key={classIns.title}
                                                                value={classIns.title}>
                                                                    {classIns.title}
                                                            </option>;
                                                            })
                                                    }
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Select Section</Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={sectionTitle} onChange={ changeExams } required>
                                                    {
                                                            sectionData.map((classIns) => {
                                                                return <option 
                                                                key={classIns.title}
                                                                value={classIns.title}>
                                                                    {classIns.title}
                                                            </option>;
                                                            })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Exam Title</Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={examTitle} onChange={ e => setExam(e.target.value) } required>
                                                    {
                                                            title.map((classIns) => {
                                                                return <option 
                                                                key={classIns.title}
                                                                value={classIns.title}>
                                                                    {classIns.title}
                                                            </option>;
                                                            })
                                                    }
                                                </Form.Control>
                                            </Form.Group>

                                            <Button className={styles.formButton} type="submit">
                                                
                                                View Grade
                                            </Button>
                                            
                                        </form>

                                        <br/>
                                    
                                    
                                </div>
                                
                                <br/>

                                <h1 className={styles.credStyle}>Class : {classTitle}</h1>
                                <h1 className={styles.credStyle}>Section : {sectionTitle}</h1>
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
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        {classSectionDataList()}
                                        
                                    </Table>
                                </div>
                                <br/><br/>

                                <Link style={{height: '45px'}} className={styles.addSecButton} to={ '/gradeReportBySection/' + classTitle + '/' + examTitle + '/' + sectionTitle }>Print Report</Link>
                            </Col>
                            
                        </Row>
                        
                        
                        
                    </Col>

                </Row>
            </div>
        </div>
        
        
        </>
    )
}

export default ViewGradesBySection