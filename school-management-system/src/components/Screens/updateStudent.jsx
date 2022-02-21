import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../assets/style.module.css'

function UpdateStudent({match,history}){
    const id=match.params.id
     
     const [address, setAddress]=useState('')
    const [ studentNo, setStudentNo ] = useState('')
    let [ studentName, setStudentName ] = useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    let [ parentName, setParentName ] = useState('')
    let [ phoneNo, setPhoneNo ] = useState('')
    let [ parentRelation, setParentRelation  ] = useState('')
    const [ dob, setDob ] = useState('')
    const [ fee, setFee ] = useState('')
   const [ cnic, setCnic ] = useState('')
    let [ email, setEmail ] = useState('')
    let [ description, setDescription ] = useState('')
    const [ classData, setClassData ] = useState([])
    const [message, setMessage]=useState("")
    const [ sectionData, setSectionData ] = useState([])
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
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

    async function fetchData(){   
        await axios.get('/api/student' ,{ params: {id} })
        .then(res=>{
            
            setStudentName(res.data.studentName)
            setStudentNo(res.data.studentNo)
            setParentName(res.data.parentName)
            setPhoneNo(res.data.phoneNo)
            setEmail(res.data.email)
            setParentRelation(res.data.parentRelation)
            setClass(res.data.Class)
            setSection(res.data.section)
            setAddress(res.data.address)
            setDob(res.data.dob)
            setCnic(res.data.cnic)
            setFee(res.data.fee)
        })
       }
       
 fetchData()
 

},[id]
)   
     const onSubmit = async() => {  
        await axios.put(`/api/updateStudent/${id}`,{id,studentNo,studentName,Class,section,address,parentName,phoneNo,parentRelation,email,description,fee})
        setTimeout(()=>{
            setMessage("")
            history.push(`/updateStudent/${id}`)
            
            },4000)
           return setMessage("Student Updated")
}
return( <>

     
  <div className={styles.margLeftRow}>
      <Row>
          <Col md={12}>
              <div className={styles.backBar}>
                  <h1>Update Student</h1>
              </div>
              
              <div className={styles.formStyle}>
                  <div className={styles.Border}>
                  {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
               
                      <form className={styles.formMargin}  onSubmit={onSubmit}>
                      
                        
                        <Form.Group controlId="formBasicEmail">
                              <Form.Label>Student Number 
                              
                              </Form.Label>
                              <Form.Control className={styles.formField} type="number"  value={studentNo} onChange={ e => setStudentNo(e.target.value) } required />
                          </Form.Group>
                          
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Name</Form.Label>
                              <Form.Control className={styles.formField} type="text"  value={studentName} onChange={ e => setStudentName(e.target.value)} required />
                          </Form.Group>
                         
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
                                    </Form.Group>              <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Date Of Birth  Format: XX-XX-XXXX</Form.Label>
                                        <Form.Control pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"  className={styles.formField} type="text" placeholder="Enter Date of Birth" value={dob} onChange={ e => setDob(e.target.value) }/>
                                    </Form.Group>
                                      
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value) } required />
                                    </Form.Group>
                                    
                           <Form.Group controlId="formBasicEmail">
                              <Form.Label>Guardian name </Form.Label>
                              <Form.Control required className={styles.formField} type="text"  value={parentName} onChange={ e => setParentName(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                                        <Form.Label>CNIC * Format: XXXXX-XXXXXXX-X</Form.Label>
                                        <Form.Control pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"className={styles.formField} type="text" placeholder="Enter CNIC" value={cnic} onChange={ e => setCnic(e.target.value) }/>
                                    </Form.Group>
                                     
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control required className={styles.formField} type="number"  value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control className={styles.formField} type="email"  value={email} onChange={ e => setEmail(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Guardian Relation</Form.Label>
                              <Form.Control className={styles.formField} type="text"  value={parentRelation} onChange={ e => setParentRelation(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                                        <Form.Label>School Fee *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter School Fee" value={fee} onChange={ e => setFee(e.target.value) }/>
                                    </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Description</Form.Label>
                              <Form.Control className={styles.formField} as="textarea"  value={description} onChange={ e => setDescription(e.target.value) } />
                          </Form.Group>

                          <Button className={styles.formButton} type="submit">
                              
                              Update Student
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
export default  UpdateStudent