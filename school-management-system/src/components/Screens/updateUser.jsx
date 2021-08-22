import {useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'


const UpdateUser =({match,history})=>{
    const id=match.params.id
    const [username, setUserName]=useState("")
    const [email, setEmail]=useState("")
    const [error, setError]=useState("")
    const [ employeeNo, setEmployeeNo ] = useState('')
   const [ address, setAddress ] = useState('')
    const [ phoneNo, setPhoneNo ] = useState('')
     const [salary, setSalary ] = useState('')
    const [ cnic, setCnic ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ role, setRole ] = useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ classData, setClassData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    
    
    
   useEffect(async()=>{
    await axios.get('/api/getClasses')
    .then((res) => {
       
        setClassData(res.data)
    })
    .catch(err => {
        console.log(err)
    })

    await axios.get('/api/getSections')
    .then((res) => {
        
        setSectionData(res.data)
        
    })
    .catch(err => {
        console.log(err)
    })

   
        async function fetchData(){   
            await axios.get('/api/auth/user' ,{ params: {id} })
            .then(res=>{
                
                setUserName(res.data.username)
                setEmployeeNo(res.data.employeeNo)
               setPhoneNo(res.data.phoneNo)
                setEmail(res.data.email)
                setAddress(res.data.address)
                setCnic(res.data.cnic)
                setSalary(res.data.salary)
                setDescription(res.data.description)
                setRole(res.data.role)
                setClass(res.data.Class)
                setSection(res.data.section)
            })
           }
           
     fetchData()
     
    
    },[id]
    )   
    
   

    const onSubmit=async(e)=>{
    if(role==='teacher' || role==='adminTeacher' || role==='financeTeacher' && Class!=''&& section!=''){

        await axios.put(`/api/auth/updateUser/${id}`,{id,employeeNo,username,email,address,cnic,phoneNo,description,salary,role,Class,section})
        history.push(`/updateUser/${id}`) 
    }  else{
        await axios.put(`/api/auth/updateUser/${id}`,{id,employeeNo,username,email,address,cnic,phoneNo,description,salary,role})
        history.push(`/updateUser/${id}`)  
    }        }
                        
                      
                            
    return(
       
           <>
              
                
            <div className={styles.margLeftRow}>
                
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Update User</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                 
                                <form className={styles.formMargin} onSubmit={onSubmit} >
                                {error && <span className='error-message'>{error}</span>}             
                                  <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Employee Number *</Form.Label>
                                        <Form.Control className={styles.formField} type="number" placeholder="Enter Unique Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Employee Name *</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Name" value={username} onChange={ e => setUserName(e.target.value) } required />
                                    </Form.Group>
                                    
                                       
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Address *</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value) } required />
                                    </Form.Group>
                                     
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>CNIC  Format: XXXXX-XXXXXXX-X</Form.Label>
                                        <Form.Control pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"  className={styles.formField} type="text" placeholder="Enter CNIC" value={cnic} onChange={ e => setCnic(e.target.value)  }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter Phone Number" value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className={styles.formField} required  type="email" placeholder="Enter Email" value={email} onChange={ e => setEmail(e.target.value) }/>
                                    </Form.Group>
                                    
                                    
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } />
                                    </Form.Group>
                                   
                        
                                    
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Salary *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter School Fee" value={salary} onChange={ e => setSalary(e.target.value) }/>
                                    </Form.Group>
                                   
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Role*</Form.Label>
                                        <Form.Control readOnly disabled className={styles.formField} type="text" placeholder="Enter Name" value={role}  />
                                    </Form.Group>
                                    
                                   
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio" name="sAdmin"  value={role} onClick={() => setRole('superAdmin')}/>
                                    <label class="form-check-label" for="sAdmin">
                                        Super Admin
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('admin')}/>
                                    <label class="form-check-label" for="sAdmin">
                                        Admin
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio" name="sAdmin"  value={role} onClick={() => setRole('finance')}/>
                                    <label class="form-check-label" for="sAdmin">
                                       Finance
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('teacher')}/>
                                    <label class="form-check-label" for="sAdmin">
                                        Teacher
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('adminFinance')}/>
                                    <label className="form-check-label" htmlFor="sAdmin">
                                        Admin Finance
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('adminTeacher')}/>
                                    <label className="form-check-label" htmlFor="sAdmin">
                                        Admin Teacher
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('financeTeacher')}/>
                                    <label className="form-check-label" htmlFor="sAdmin">
                                        Finance Teacher
                                    </label>
                                    </div>
                                  
                                    {role=='teacher'|| role=='financeTeacher' || role=='adminTeacher'?
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
                                    </Form.Group>:''}
                                    {role==='teacher'|| role==='financeTeacher' || role==='adminTeacher'?
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
                                    </Form.Group>:''}
                                    
                                    <Button className={styles.formButton} type="submit">
                                        
                                      Update User
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

export default UpdateUser