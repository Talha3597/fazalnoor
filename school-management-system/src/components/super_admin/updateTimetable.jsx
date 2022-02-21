import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useParams } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';


function UpdateTimetable() {

    const { id } = useParams()
    const [ title, setTitle ] = useState('')
    const [ section, setSection ] = useState('')
    const [ day, setDay ] = useState('monday')
    const [ lecStart, setLecStart ] = useState('')
    const [ lecEnd, setLecEnd ] = useState('')
    const [ teacherName, setTeacherName ] = useState('')
    const [ timetableData, setTimetable ] = useState([])
    const [ userNamesData, setUserNamesData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    useEffect(() => {
      
         axios.get('/api/auth/userNames')
        .then((res) => {
            console.log(res.data)
            setUserNamesData(res.data)
           
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
        axios.get('/api/singleTimetable/' + id)
        .then((res) => {
            console.log(res.data)
            //setGrade(res.data)
            setTitle(res.data.title)
            setDay(res.data.day)
            setLecStart(res.data.lecStart)
            setLecEnd(res.data.lecEnd)
            setTeacherName(res.data.teacherName)
            setSection(res.data.section)
        })
        .catch(err => {
            console.log(err)
        })


        axios.get('/api/getTimetable',{params: {section}})
            .then(res => {
                setTimetable(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [section,id])

    const onSubmit = async(e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
            $('#teacherName').fadeOut(100)
            $('#lecStart').fadeOut(100)
            $('#lecEnd').fadeOut(100)
            
      
       


        if(title !== '' && teacherName !== '' && section !=='' && lecEnd !=='' && lecStart !=='' ){

            

            
                
                const lecture = {
                    title,
                    section,
                    lecStart,
                    lecEnd,
                    teacherName,
                    day
                }
                
    
                await axios.post('/api/updateTimetable/' + id, lecture)
                        window.location=`/updateTimetable/${id}`
        }else{
           
        
                alert('Duration of lecture is more than one hour.')
           
        }
    }



    return (
        <>

            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Update Lecture For {section}</h1>
                                </div>

                                
                                
                            </Col>    
                        </Row>

                        
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.formStyle}>
                                    <div className={styles.Border}>
                                        <br/>
                                        <form name="classForm" className={styles.formMargin} onSubmit={onSubmit} noValidate>
                                        <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Section *</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={section} onChange={ e => setSection(e.target.value) } required >
                                        <option defaultValue>Select Section</option>
                                            {
                                                 sectionData.map((section,idx) => {
                                                     return <option 
                                                        key={section._id}
                                                        value={section.title}>
                                                            {section.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Lecture Title</Form.Label>
                                                <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required/>
                                                <Form.Text id="title" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide title for Lecture.
                                                </Form.Text>
                                                <Form.Text id="titleCheck" className={styles.authtextF1} style={{display: 'none'}}>
                                                    You have already Added this Lecture.
                                                </Form.Text>
                                            </Form.Group> 

                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Day</Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={day} onChange={ e => setDay(e.target.value) } required>
                                                    <option value='monday'>Monday</option>
                                                    <option value='tuesday'>Tuesday</option>
                                                    <option value='wednesday'>Wednesday</option>
                                                    <option value='thursday'>Thursday</option>
                                                    <option value='friday'>Friday</option>
                                                    
                                                    
                                                </Form.Control>
                                                <Form.Text id="lecEnd" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide End Time for this lecture.
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Teacher Name </Form.Label>
                                                <Form.Control className={styles.formField} as="select" value={teacherName} onChange={ e => setTeacherName(e.target.value) } required >
                                            {
                                                 userNamesData.map((item) => {
                                                      return <option 
                                                        value={item}>
                                                            {item}
                                                    </option>}
                                                    )
                                            }</Form.Control>
                                                <Form.Text id="teacherName" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide teacher name for this lecture.
                                                </Form.Text>
                                            </Form.Group>
                                            
                                            
                                   
                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>Start Time (e.g 8:00am/pm)</Form.Label>
                                                <Form.Control className={styles.formField} text="text" value={lecStart} onChange={ e => setLecStart(e.target.value) } required/>
                                                <Form.Text id="lecStart" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide Start Time for this lecture.
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicstudentClass">
                                                <Form.Label>End Time</Form.Label>
                                                <Form.Control className={styles.formField} text="text" value={lecEnd} onChange={ e => setLecEnd(e.target.value) } required/>
                                                <Form.Text id="lecEnd" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide End Time for this lecture.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button className={styles.formButton} type="submit">
                                                
                                                Update Lecture
                                            </Button>
                                            
                                        </form>

                                        <br/>
                                    </div>
                                    
                                </div>

                            </Col>
                            
                        </Row>
                        
                        
                        
                    </Col>

                </Row>
            </div>
        
        
        
        </>
    )
}

export default UpdateTimetable