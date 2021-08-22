import {useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const RegisterScreen =({history})=>{
    const [username, setUserName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [cPassword, setCpassword]=useState("")
    const [error, setError]=useState("")
    const [ employeeNo, setEmployeeNo ] = useState('')
   const [ address, setAddress ] = useState('')
    const [ phoneNo, setPhoneNo ] = useState('')
    const [ invoiceNo, setInvoiceNo ] = useState('')
    const [salary, setSalary ] = useState('')
    const [ cnic, setCnic ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ role, setRole ] = useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
    const [ classData, setClassData ] = useState([])
    const [ sectionData, setSectionData ] = useState([])
    
    const [ paidAmount, setPaidAmount ] = useState('')
    
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

   },[]

   )
   

    const onSubmit=async(e)=>
            {
                e.preventDefault()
                const config ={
                     header:{
                         "Content-Type":  "application/json"
                     }
                }
                if (password !== cPassword ) {
                    setPassword("");
                    setCpassword("");
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError("Passwords do not match");
                  }
                  if (password.length <=3 ) {
                    setPassword("");
                    setCpassword("");
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError(`Password is Too short${role}`);
                  }
                  if (role =='' ) {
                    
                    setTimeout(() => {
                      setError("");
                    }, 5000);
                    return setError("Role is required");
                  }
             
                      const {data}=await axios.post("/api/auth/register",{employeeNo,username,email,password,address,cnic,phoneNo,description,salary,paidAmount,invoiceNo,role,Class,section},config)    
                  alert(data.data)
                  history.push('/users')
                  history.push('/register')
                       }
                        
                      
                            
    return(
       
           <>
              
                
            <div className={styles.margLeftRow}>
                
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Register User</h1>
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
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control className={styles.formField} type="password" placeholder="Enter Password " value={password} onChange={ e => setPassword(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Confirm</Form.Label>
                                        <Form.Control className={styles.formField} type="password" placeholder="Enter Confirm Password " value={cPassword} onChange={ e => setCpassword(e.target.value) }/>
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
                                    <h1> Role</h1>
                                   
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sAdmin"  value={role} onClick={() => setRole('superAdmin')}/>
                                    <label className="form-check-label" htmlFor="sAdmin">
                                        Super Admin
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('admin')}/>
                                    <label className="form-check-label" htmlFor="sAdmin">
                                        Admin
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="sAdmin"  value={role} onClick={() => setRole('finance')}/>
                                    <label className="form-check-label" htmlFor="sAdmin">
                                       Finance
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio"  name="sAdmin"  value={role} onClick={() => setRole('teacher')}/>
                                    <label className="form-check-label" htmlFor="sAdmin">
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
                                     <h1> Salary Structure</h1>
                                    
                        
                                   
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Salary *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter School Fee" value={salary} onChange={ e => setSalary(e.target.value) }/>
                                    </Form.Group>
                                   
                                    {role=='teacher'|| role=='financeTeacher' || role=='adminTeacher'?
                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option defaultValue>Select Class</option>
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
                                    </Form.Group>:''}
                                    {role=='teacher'|| role=='financeTeacher' || role=='adminTeacher'?
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
                                    </Form.Group>:''}
                                    <Button className={styles.formButton} type="submit">
                                    
                                        Register New User
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

export default RegisterScreen