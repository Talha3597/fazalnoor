import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button,Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const Exam =  ({history})=> {
   // const [message, setMessage]=useState("")
   const [ classData, setClassData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    const [ examData, setExamData ] = useState([])

    const [error, setError]=useState("")
    const [title,setTitle]= useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [message, setMessage]=useState("")
    
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
    axios.get('/api/getClasses')
        .then((res) => {
           
            setClassData(res.data)
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
        axios.get('/api/exams' ,{ params: {Class,section} })
        .then((res) => {
            
            setExamData(res.data)
            
        })
        .catch(err => {
            console.log(err)
        })

        
}, [])

    const onSubmit = async(e) => {
       
        if(Class==''|| section=='')
        {
            
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError(" Select Class and Section");
                  
        }
          
             
               const{data} =await axios.post('/api/addExam',{Class,section,title})
          
            setTimeout(()=>{
                setMessage("")
                history.push('/exam')
                
                },4000)
               return setMessage(data.token)

    }

    return (
        <>

        
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Add Exam</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
               

                            <div className={styles.Border}>
                            {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                         <br/>
                                <form className={styles.formMargin} onSubmit={onSubmit}>
                                {error && <span className='error-message'>{error}</span>}             
                                 
                                <Form.Group controlId="formBasicstudentClass">
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                                    </Form.Group>
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option value=''defaultValue>Select Exam</option>
                                            {   
                                                 classData.map((classIns,idx) => {
                                                     return <option 
                                                        key={classIns._id}
                                                        value={classIns.title}>
                                                            {classIns.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Section</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={section} onChange={ e => setSection(e.target.value) } required >
                                        <option value=''defaultValue>Select Section</option>
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
                                    <br/>
                                             <input type='date' onChange={ e => setTitle(title+':'+e.target.value) }/>
                                             <br/>
                                             <br/>
                                    <Button className={styles.formButton} type="submit">
                                        
                                        Add Exam
                                    </Button>
                                    <br/>
                                             <br/>
                                </form>
                                <Table striped bordered hover size='sm'>
                                    <thead>
                                     <th>Exam Title</th>
                                     <th>Class</th>
                                     <th>Section</th>
                                     <th></th>
                                    </thead>
                                    <tbody>
                                    
                                        {
                                            examData.map(item=>{return(<tr key={item._id}>
                                                <td>{item.title}</td>
                                                <td>{item.Class}</td>
                                                <td>{item.section}</td>
                                                <td> <Button className={styles.sideButton2} onClick={() => removeData(item._id)}>
                         Delete
                        </Button></td>
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