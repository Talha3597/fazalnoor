import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useParams } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';


function UpdateGrade() {

    const { id } = useParams()
    const [ grade, setGrade ] = useState({})
    const [ title, setTitle ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ totalMarks, setTotalMarks ] = useState(0)
    const [ obtainedMarks, setObtainedMarks ] = useState(0)
    const [ gradesTitles, setGradesTitles ] = useState([])
    const [ examData, setExamData ] = useState([])
const spaceClean=()=>{
    setMessage('')
    setTotalMarks(0)
    setObtainedMarks(0)
    setTitle('')
}
async function fetchSingleGrades(){ 
    await  axios.get('/api/singleGrade/' + id)
      .then((res) => {
          console.log(res.data)
          setGrade(res.data)
          setTitle(res.data.title)
          setClass(res.data.stdclass)
          setSection(res.data.section)
          setTotalMarks(res.data.totalMarks)
          setObtainedMarks(res.data.obtainedMarks)
      })
      .catch(err => {
          console.log(err)
      })}
      async function fetchGradesTitlesData(){ 
        await axios.get('/api/getGradestitles/' + id)
        .then((res) => {
            console.log(res.data)
            setGradesTitles(res.data)
        })
        .catch(err => {
            console.log(err)
        })}
    useEffect(() => {
         axios.get('/api/getGradestitles/' + id)
        .then((res) => {
            console.log(res.data)
            setGradesTitles(res.data)
        })
        .catch(err => {
            console.log(err)
        })
          axios.get('/api/singleGrade/' + id)
        .then((res) => {
            console.log(res.data)
            setGrade(res.data)
            setTitle(res.data.title)
            setClass(res.data.stdclass)
            setSection(res.data.section)
            setTotalMarks(res.data.totalMarks)
            setObtainedMarks(res.data.obtainedMarks)
        })
        .catch(err => {
            console.log(err)
        })
       axios.get('/api/exams',{params:{Class,section}})
       .then((res) => {
           console.log(res.data)
           setExamData(res.data)
       })
       .catch(err => {
           console.log(err)
       })

   

    },[Class,section,id])
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])

    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
            $('#totalmarks').fadeOut(100)
            $('#obtainedmarks').fadeOut(100)
            $('#titleCheck').fadeOut(100)
            
      
        var flag = false

        gradesTitles.forEach(element => {
            if(element === title.toLowerCase()){
                flag = true
            }
        })

        if(title !== '' && totalMarks > 0 && obtainedMarks >= 0 && flag === false && totalMarks >= obtainedMarks){



            const section = {
                title,
                totalMarks,
                obtainedMarks,
            }

            axios.post('/api/updateGrade/' + id, section)
                .then(res => {
                    setTimeout(() => {
                        spaceClean()
                        fetchGradesTitlesData()
                        fetchSingleGrades()
                     }, 4000);
                     return setMessage("Grades Updated");
                })
                .catch(err => console.log('error : ' + err))
        }else{
            document.classForm.classList.add('was-validated')
            if(title === ''){
                $('#title').fadeIn(100)
            }

            if(totalMarks === 0){
                $('#totalmarks').fadeIn(100)
            }

            if(obtainedMarks < 0){
                $('#obtainedmarks').fadeIn(100)
            }

            if(flag === true){
                $('#titleCheck').fadeIn(100)
            }
            
            if(totalMarks < obtainedMarks){
                alert('Total Marks are less than Obtained Marks')
            }
            
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
                                    <h1>Update Grade</h1>
                                </div>

                                
                                
                            </Col>    
                        </Row>

                        
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.formStyle}>
                                    <div className={styles.Border}>
                                    {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             

                                        <form name="classForm" className={styles.formMargin} onSubmit={onSubmit} noValidate>

                                        <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Exam Title</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={title} onChange={ e => setTitle(e.target.value) } >
                                          <option defaultValue>Select Exam</option>
                                            {   
                                                 examData.map((classIns,idx) => {
                                                     return <option 
                                                        key={classIns.title}
                                                        value={classIns.title}>
                                                            {classIns.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Total Marks</Form.Label>
                                                <Form.Control className={styles.formField} type="number" placeholder="Total" value={totalMarks} onChange={ e => setTotalMarks(e.target.value) } required />
                                                <Form.Text id="totalmarks" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide total marks for Grade.
                                                </Form.Text>
                                            </Form.Group>


                                            <Form.Group>
                                                <Form.Label>Obtained Marks</Form.Label>
                                                <Form.Control className={styles.formField} type="number" placeholder="Obtained" value={obtainedMarks} onChange={ e => setObtainedMarks(e.target.value) } required />
                                                <Form.Text id="obtainedmarks" className={styles.authtextF1} style={{display: 'none'}}>
                                                    Please provide obtained marks for Grade.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button className={styles.formButton} type="submit">
                                                
                                                Update Grade
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

export default UpdateGrade