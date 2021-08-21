import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const AddStudent =  ({history})=> {
   // const [message, setMessage]=useState("")
    const [ studentNo, setStudentNo ] = useState('')
    const [ name, setName ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ rollNo, setRollNo ] = useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ parentName, setParentName ] = useState('')
    const [ phoneNo, setPhoneNo ] = useState('')
    const [ invoiceNo, setInvoiceNo ] = useState('')
    const [ schoolFee, setSchoolFee ] = useState('')
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
    const [ admissionFee, setAdmissionFee ] = useState('')
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
    const onSubmit = async(e) => {
        e.preventDefault()
        if(Class==''|| section=='')
        {
            
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError(" Select Class and Section");
                  
        }
               const{data} =await axios.post('http://localhost:5000/api/addStudent',{studentNo,name,rollNo,Class,section,dob,address,parentName,phoneNo,parentRelation,email,description,schoolFee,cnic,createdBy,admissionFee})
                 alert(data.token) 
                 history.push('/students')
                 history.push('/addStudent')
                 
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
                                <br/>
                                 
                                <form className={styles.formMargin} onSubmit={onSubmit} >
                                {/* <Form.Group controlId="formBasicEmail">
                                   
                                    <input type="file" id="myFile" name="filename"/>
                                    <input type="submit" value={photo} onChange={ e => setPhoto(e.target.value) }>Upload</input>
                                    <img  width="100" height="100" src={photo} alt="Italian Trulli"></img>
                                  </Form.Group> */}
                                 {error && <span className='error-message'>{error}</span>}             
                                 
                                  <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Student Number *</Form.Label>
                                        <Form.Control className={styles.formField} type="number" placeholder="Enter Unique Student Number" value={studentNo} onChange={ e => setStudentNo(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Name *</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Name" value={name} onChange={ e => setName(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control className={styles.formField} type="number" placeholder="Enter Roll Number" value={rollNo} onChange={ e => setRollNo(e.target.value) }/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option defaultValue>Select Class</option>
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
                                        <Form.Label>Section</Form.Label>
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
                                        <Form.Label>CNIC  Format: XXXXX-XXXXXXX-X</Form.Label>
                                        <Form.Control pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"  className={styles.formField} type="text" placeholder="Enter CNIC" value={cnic} onChange={ e => setCnic(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter Number" value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }/>
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
                                    {error && <span className='error-message'>{error}</span>}             
                                
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