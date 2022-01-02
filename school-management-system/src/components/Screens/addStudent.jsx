import React, { useState,useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const AddStudent =  ({history})=> {
   // const [message, setMessage]=useState("")
    
    const [ name, setName ] = useState('')
    const [ address, setAddress ] = useState('')
   
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ parentName, setParentName ] = useState('')
    const [ phoneNo, setPhoneNo ] = useState('')
    const [ schoolFee, setSchoolFee ] = useState(0)
    const [ cnic, setCnic ] = useState('')
    const [ dob, setDob ] = useState('')
    const [ paidAmount, setPaidAmount ] = useState('')
    const [ parentRelation, setParentRelation  ] = useState('')
   // const [ group, setGroup ] = useState('')
  //const [ photo, setPhoto ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ description, setDescription ] = useState('')
    const createdBy=localStorage.getItem("username")
    const [ classData, setClassData ] = useState([])
    const [ account, setAccount ] = useState('')
    const [ admissionFee, setAdmissionFee ] = useState(0)
    const [ sectionData, setSectionData ] = useState([])
    const [error, setError]=useState("")
    const [message, setMessage]=useState("")
       const freeSpace=()=>{
           setAccount('')
           setAddress('')
           setAdmissionFee(0)
           setClass('')
           setCnic('')
           setDescription('')
           setDob('')
           setEmail('')
           setName('')
           setParentName('')
           setParentRelation('')
           setPhoneNo('')
           setSchoolFee(0)
           setSection('')
           setMessage('')
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

            
    }, [])
    const onSubmit = async(e) => {
        e.preventDefault()
        if(Class==''|| section=='')
        {
            
                    setTimeout(() => {
                      setError('');
                    }, 5000);
                    return setError(" Select Class and Section");
                  
        }
        if(admissionFee<0 || schoolFee<0)
        {

            setTimeout(() => {
                setError('');
              }, 5000);
              return setError(" Amount should not be negative");
            
        }
               const{data} =await axios.post('/api/addStudent',{name,Class,section,dob,address,parentName,phoneNo,parentRelation,email,description,schoolFee,cnic,createdBy,admissionFee})
               
               setTimeout(()=>{
                
              freeSpace()
                
                },4000)
               return setMessage(data.message)
                 
    }

    return (
        <>

      
            <div className={styles.margLeftRow}>
                
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Add New Student</h1>
                        </div>
                        
                        <div className={styles.formStyle}>

                            <div className={styles.Border}>
                            {error && <Button  className={styles.sideButton5} autoFocus >{error}</Button>}             
                        {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                                <form className={styles.formMargin} onSubmit={onSubmit} autoComplete="off" >
                                 
                                 
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Name *</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Name" value={name} onChange={ e => setName(e.target.value) } required />
                                    </Form.Group>
                                   
                                    
                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class *</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option value ='' defaultValue>Select Class</option>
                                            {   
                                                 classData.map((classIns,idx) => {
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
                                        <Form.Label>Section *</Form.Label>
                                        <Form.Control className={styles.formField} as="select" value={section} onChange={ e => setSection(e.target.value) } required >
                                        <option value='' defaultValue>Select Section</option>
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
                                    </Form.Group>   <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Date Of Birth  Format: XX-XX-XXXX</Form.Label>
                                        <Form.Control pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"  className={styles.formField} type="text" placeholder="Enter Date of Birth" value={dob} onChange={ e => setDob(e.target.value) }/>
                                    </Form.Group>
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Address *</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value) } required />
                                    </Form.Group>
                                     <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Guardian name *</Form.Label>
                                        <Form.Control required className={styles.formField} type="text" placeholder="Enter Parent Name" value={parentName} onChange={ e => setParentName(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>CNIC   Format: XXXXX-XXXXXXX-X</Form.Label>
                                        <Form.Control pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"  className={styles.formField} type="text" placeholder="Enter CNIC" value={cnic} onChange={ e => setCnic(e.target.value) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control pattern="[0-9]" required className={styles.formField} type="number" placeholder="Enter Number" value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className={styles.formField} type="email" placeholder="Enter Email" value={email} onChange={ e => setEmail(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Guardian Relation</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Parent Relation" value={parentRelation} onChange={ e => setParentRelation(e.target.value) }/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } />
                                    </Form.Group>
                                    <div >
                                     <h1> Student Fee Structure</h1>
                                    </div>
                        
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Admission Fee *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter School Fee" value={admissionFee} onChange={ e => setAdmissionFee(e.target.value) }/>
                                    </Form.Group> 
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>School Fee *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter School Fee" value={schoolFee} onChange={ e => setSchoolFee(e.target.value) }/>
                                    </Form.Group>
                                       <Button className={styles.formButton} type="submit">
                                        
                                        Add New Student
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

export default AddStudent