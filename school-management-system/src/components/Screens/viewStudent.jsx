import React, { useEffect, useState,useRef} from 'react';
import axios from 'axios';
import { Row, Col, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../assets/style.module.css'
import { useReactToPrint } from 'react-to-print';
function ViewUser({match}){
    const id=match.params.id
     
     const [address, setAddress]=useState('')
    const [ studentNo, setStudentNo ] = useState('')
    let [ studentName, setStudentName ] = useState('')
    let [ rollNo, setRollNo ] = useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    let [ parentName, setParentName ] = useState('')
    let [ phoneNo, setPhoneNo ] = useState('')
    let [ parentRelation, setParentRelation  ] = useState('')
    const [ dob, setDob ] = useState('')
    const [ schoolFee, setSchoolFee ] = useState('')

   const [ cnic, setCnic ] = useState('')
    let [ email, setEmail ] = useState('')
    let [ description, setDescription ] = useState('')
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
     
      
useEffect(()=>{
    async function fetchData(){   
        await axios.get('http://localhost:5000/api/student' ,{ params: {id} })
        .then(res=>{
            
            setStudentName(res.data.studentName)
            setStudentNo(res.data.studentNo)
            setParentName(res.data.parentName)
            setRollNo(res.data.rollNo)
            setPhoneNo(res.data.phoneNo)
            setEmail(res.data.email)
            setParentRelation(res.data.parentRelation)
            setClass(res.data.Class)
            setSection(res.data.section)
            setAddress(res.data.address)
            setDob(res.data.dob)
            setCnic(res.data.cnic)
            setSchoolFee(res.data.fee)
        })
       }
       
 fetchData()
 

},[id]
)   
     
return( <>

     
  <div className={styles.margLeftRow}>
      <Row>
          <Col md={12}>
<div ref={componentRef} >
              <div className={styles.backBar}>
                  <h1>View Student</h1>
              </div>
              
              <div className={styles.formStyle}>
                  <div className={styles.Border}>
                     
                      <br/>
                    &nbsp;  &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button> 
                      <form className={styles.formMargin}  >
                     
                        
                        <Form.Group controlId="formBasicEmail">
                              <Form.Label>Student Number 
                              
                              </Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} type="number"  value={studentNo} onChange={ e => setStudentNo(e.target.value) } required />
                          </Form.Group>
                          
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Name</Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} type="text"  value={studentName} onChange={ e => setStudentName(e.target.value)} required />
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>ID</Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} type="number"  value={rollNo} onChange={ e => setRollNo(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Class</Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} type="text"  value={Class} onChange={ e => setClass(e.target.value)} required />
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Section</Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} type="text"  value={section} onChange={ e => setSection(e.target.value)} required />
                          </Form.Group>
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Date Of Birth  Format: XX-XX-XXXX</Form.Label>
                                        <Form.Control readOnly disabled pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"  className={styles.formField} type="text" placeholder="Enter Date of Birth" value={dob} onChange={ e => setDob(e.target.value) }/>
                                    </Form.Group>
                                      
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control readOnly disabled className={styles.formField} type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value) } required />
                                    </Form.Group>
                                    
                           <Form.Group controlId="formBasicEmail">
                              <Form.Label>Guardian name </Form.Label>
                              <Form.Control readOnly disabled  className={styles.formField} type="text"  value={parentName} onChange={ e => setParentName(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                                        <Form.Label>CNIC * Format: XXXXX-XXXXXXX-X</Form.Label>
                                        <Form.Control readOnly disabled pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}" required className={styles.formField} type="text" placeholder="Enter CNIC" value={cnic} onChange={ e => setCnic(e.target.value) }/>
                                    </Form.Group>
                                     
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control readOnly disabledclassName={styles.formField} type="number"  value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} type="email"  value={email} onChange={ e => setEmail(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Guardian Relation</Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} type="text"  value={parentRelation} onChange={ e => setParentRelation(e.target.value) }/>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                                        <Form.Label>School Fee *</Form.Label>
                                        <Form.Control readOnly disabled className={styles.formField} type="number" placeholder="Enter School Fee" value={schoolFee} onChange={ e => setSchoolFee(e.target.value) }/>
                                    </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                              <Form.Label>Description</Form.Label>
                              <Form.Control readOnly disabled className={styles.formField} as="textarea"  value={description} onChange={ e => setDescription(e.target.value) } />
                          </Form.Group>

                          
                      </form>
                      
                      <br/>
                  </div>
                  
              </div>
              </div>
          </Col>

      </Row>
  </div>





</>
)
}
export default  ViewUser