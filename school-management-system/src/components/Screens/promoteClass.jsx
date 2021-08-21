import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const PromoteClass =  ({history})=> {
   // const [message, setMessage]=useState("")
    
    const [ tClass, setTclass ] = useState('')
    const [tSection,setTsection]= useState('')
    const [ fClass, setFclass ] = useState('')
    const [ fSection, setFsection ] = useState('')
    const [ classData, setClassData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    const [error, setError]=useState("")
    useEffect(() => {
        axios.get('http://localhost:5000/api/getClasses')
            .then((res) => {
               
                setClassData(res.data)
            })
            .catch(err => {
				console.log(err)
			})

            axios.get('http://localhost:5000/api/getSections')
            .then((res) => {
                
                setSectionData(res.data)
                
            })
            .catch(err => {
				console.log(err)
			})

            
    }, [])
   

    
        
    const onSubmit = async() => {
       
        
        if(tClass==''|| tSection=='')
        {
            
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError(" Select Class and Section");
                  
        }
        if(fClass==''|| fSection=='')
        {
            
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError(" Select Class and Section");
                  
        }

        await axios.post(`http://localhost:5000/api/promote`,{tClass,tSection,fClass,fSection})
        
           history.push('/promote')
      
           
            
                


    }
   
   return (
    <>

   
        <div className={styles.margLeftRow}>
            <Row>
                <Col md={12}>
                    <div className={styles.backBar}>
                        <h1>Promote Class</h1>
                    </div>
                    
                    <div className={styles.formStyle}>
                        <div className={styles.Border}>
                            <br/>
                             
                            <form className={styles.formMargin} onSubmit={onSubmit}>
                            {error && <span className='error-message'>{error}</span>}  
                           
                                <div className={styles.backBar}>
                                <h1>From</h1>
                                </div>
                             <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={fClass} onChange={ e => setFclass(e.target.value) } >
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
                                        <Form.Control className={styles.formField} as="select" value={fSection} onChange={ e => setFsection(e.target.value) } required >
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
                                          <div className={styles.backBar}>
                                     <h1>To</h1>
                                    </div>
                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={tClass} onChange={ e => setTclass(e.target.value) } >
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
                                        <Form.Control className={styles.formField} as="select" value={tSection} onChange={ e => setTsection(e.target.value) } required >
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
                                        
                                        Promote
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
 export default PromoteClass