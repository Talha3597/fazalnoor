import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
const TransferStudent =  ({history})=> {
    
    const [ Class, setClass ] = useState('')
    const [section,setSection]= useState('')
    const [ studentNo, setStudentNo ] = useState('')
    const [ classData, setClassData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    const [error, setError]=useState("")
    const [message, setMessage]=useState("")
    
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

            
    }, [])
   
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    const onSubmit = async(e) => {
        e.preventDefault()
        if(Class==''|| section=='')
        {
            
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError(" Select Class and Section");
                  
        }
       
          
     await axios.post(`/api/transfer`,{Class,section,studentNo})
            setTimeout(()=>{
                setMessage("")
                history.push(`/blank`)
                history.push(`/transfer`)
                
                },4000)
               return setMessage(`Student Transfered to ${Class}`)
            
                


    }
   
   return (
    <>

   
        <div className={styles.margLeftRow}>
            <Row>
                <Col md={12}>
                    <div className={styles.backBar}>
                        <h1>Transfer Student</h1>
                    </div>
                    
                    <div className={styles.formStyle}>
                        <div className={styles.Border}>
                        {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             

                            <form className={styles.formMargin} onSubmit={onSubmit}>
                            {error && <span className='error-message'>{error}</span>}  
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Student Number</Form.Label>
                                        <Form.Control className={styles.formField} type="number" placeholder="Enter Unique Student Number" value={studentNo} onChange={ e => setStudentNo(e.target.value) } required />
                                    </Form.Group>
                                    <div className={styles.backBar}>
                                     <h1>To</h1>
                                    </div>
                                 
                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option selected>Select Class</option>
                                            {   
                                                 classData.map((classIns) => {
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
                                        <Form.Label>Section</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={section} onChange={ e => setSection(e.target.value) } required >
                                        <option selected>Select Section</option>
                                            {
                                                 sectionData.map((section) => {
                                                     return <option 
                                                        key={section.title}
                                                        value={section.title}>
                                                            {section.title}
                                                    </option>;
                                                    })
                                            }
                                        </Form.Control>
                                    </Form.Group> 
                                  <Button className={styles.formButton} type="submit">
                                        
                                        Transfer
                                    </Button>
                                    
                                </form>
                                
                                <br/>
                            </div>
                            
                        </div>
                    </Col>

                </Row>
            </div>
        
        
        

        
        </>
   )

}
 export default TransferStudent