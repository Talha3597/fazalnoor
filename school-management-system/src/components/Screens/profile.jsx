import {useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'


const Profile =()=>{
    const id=localStorage.getItem("id")
    const [username, setUserName]=useState("")
    const [email, setEmail]=useState("")
    const [error, setError]=useState("")
    const [ employeeNo, setEmployeeNo ] = useState('')
   const [ address, setAddress ] = useState('')
    const [ phoneNo, setPhoneNo ] = useState('')
     const [salary, setSalary ] = useState('')
    const [ cnic, setCnic ] = useState('')
    const [ description, setDescription ] = useState('')
   const [password,setPassord] = useState('')
   const [confirmPassword,setConfirmPassord] = useState('')
    
    useEffect(()=>{
        async function fetchData(){   
            await axios.get('http://localhost:5000/api/auth/user' ,{ params: {id} })
            .then(res=>{
                
                setUserName(res.data.username)
                setEmployeeNo(res.data.employeeNo)
               setPhoneNo(res.data.phoneNo)
                setEmail(res.data.email)
                setAddress(res.data.address)
                setCnic(res.data.cnic)
                setSalary(res.data.salary)
                setDescription(res.data.description)
            })
           }
           
     fetchData()
     
    
    },[id]
    )   
    
   

    const onSubmit=async(e)=>{
  
   if(password && password === confirmPassword){
    await axios.put(`http://localhost:5000/api/auth/updateProfile/${id}`,{id,employeeNo,username,address,cnic,phoneNo,description,password})
    .then(
        window.location = '/profile'
    )     
   }
   else if(password !== confirmPassword){
    alert('password and confirm password not match')}
    else{
        await axios.put(`http://localhost:5000/api/auth/updateProfile/${id}`,{id,employeeNo,username,address,cnic,phoneNo,description})
        .then(
            window.location = '/profile'
        )     
    }
}                   
                      
                            
    return(
       
           <>
              
                
            <div className={styles.margLeftRow}>
                
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Profile</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                 
                                <form className={styles.formMargin} onSubmit={onSubmit} >
                                {error && <span className='error-message'>{error}</span>}             
                                  <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Employee Number *</Form.Label>
                                        <Form.Control  readOnly disabled className={styles.formField} type="number" placeholder="Enter Unique Employee Number" value={employeeNo} onChange={ e => setEmployeeNo(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Employee Name *</Form.Label>
                                        <Form.Control  readOnly disabled className={styles.formField} type="text" placeholder="Enter Name" value={username} onChange={ e => setUserName(e.target.value) } required />
                                    </Form.Group>
                                    
                                       
                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Address *</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value) } required />
                                    </Form.Group>
                                     
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>CNIC  Format: XXXXX-XXXXXXX-X</Form.Label>
                                        <Form.Control  readOnly disabled pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"  className={styles.formField} type="text" placeholder="Enter CNIC" value={cnic} onChange={ e => setCnic(e.target.value)  }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control required className={styles.formField} type="number" placeholder="Enter Phone Number" value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control readOnly disabled  className={styles.formField} required  type="email" placeholder="Enter Email" value={email} onChange={ e => setEmail(e.target.value) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>New Password *</Form.Label>
                                        <Form.Control  className={styles.formField} type="password" placeholder="Enter Password" value={password} onChange={ e => setPassord(e.target.value) }  />
                                    </Form.Group><Form.Group controlId="formBasicEmail">
                                        <Form.Label>Confirm Password *</Form.Label>
                                        <Form.Control className={styles.formField} type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={ e => setConfirmPassord(e.target.value) } />
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } />
                                    </Form.Group>
                                   
                        
                                    
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Salary *</Form.Label>
                                        <Form.Control  readOnly disabled required className={styles.formField} type="number" placeholder="Enter School Fee" value={salary} onChange={ e => setSalary(e.target.value) }/>
                                    </Form.Group>
                                   
                                    
                                    <Button className={styles.formButton} type="submit">
                                        
                                      Update Profile
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

export default Profile