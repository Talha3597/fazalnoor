import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const SchoolInfoSetting =  (history)=> {
    
    const [principalMessage,setPrincipalMessage]= useState('')
    const [mission,setMission]= useState('')
    const [id,setId]= useState('')
    const [message,setMessage]= useState('')
    const [schoolName,setSchoolName]= useState('')
    const [address, setAddress]=useState('')
    const [email, setEmail]=useState('')
    const [phoneNo, setPhoneNo]=useState('')
    const [whatsapp, setWhatsapp]=useState('')
    const [facebook, setFacebook]=useState('')
    const [map, setMap]=useState('')
    const [schoolInfoData, setSchoolInfoData]=useState([])
    
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
  
   useEffect(() => {
    axios.get('/api/getSchoolInfo')
    .then((res) => {
        console.log(res.data)
        setSchoolInfoData(res.data)
        setPrincipalMessage(res.data[0].principalMessage)
        setMission(res.data[0].mission)
        setSchoolName(res.data[0].schoolName)
        setAddress(res.data[0].address)
        setPhoneNo(res.data[0].phoneNo)
        setEmail(res.data[0].email)
        setWhatsapp(res.data[0].whatsapp)
        setFacebook(res.data[0].facebook)
        setMap(res.data[0].map)
        setId(res.data[0]._id)

    })
    .catch(err => {
        console.log(err)
    })
        
}, [])
const updateData=()=>{
     axios.put(`/api/updateSchoolInfo/${id}`,{id,principalMessage,mission,schoolName,address,email,phoneNo,whatsapp,facebook,map})
          
    setTimeout(()=>{
        setMessage("") 
     window.location='/schoolInfoSetting'
        },4000)
       return setMessage("Information Updated")

}
const removeData=()=>{
    let flag= window.confirm("Delete School Info!")
    if(flag)
    { 
       axios.delete(`/api/deleteSchoolInfo`, { params: {id} }) 
      window.location='/schoolInfoSetting'
          }
  }
    const onSubmit = async(e) => { 
        e.preventDefault()    
            await axios.post('/api/addSchoolInfo',{principalMessage,mission,schoolName,address,email,phoneNo,whatsapp,facebook,map})
          
            setTimeout(()=>{
                setMessage("") 
             window.location='/schoolInfoSetting'
                },4000)
               return setMessage("Information Added")

    }

    return (
        <>

        
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>School Information</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
               

                            <div className={styles.Border}>
                            {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                         <br/>{!schoolInfoData[0]?
                                <form className={styles.formMargin} onSubmit={onSubmit}>
                                 
                               
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>School Name</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter school Name" value={schoolName} onChange={ e => setSchoolName(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Principal's Message</Form.Label>
                                    <Form.Control className={styles.formField} as="textarea"  rows="10" placeholder="principal's messsage" value={principalMessage} onChange={ e => setPrincipalMessage(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Our Mission</Form.Label>
                                    <Form.Control className={styles.formField} as="textarea"  rows="10" placeholder="Enter mission statement" value={mission} onChange={ e => setMission(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control className={styles.formField} type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className={styles.formField} type="email" placeholder="Enter Email" value={email} onChange={ e => setEmail(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Phone Numbers(xxxxxxxxxx/xxxxxxxxx)</Form.Label>
                                    <Form.Control className={styles.formField} type="text" placeholder="Enter phone number" value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Whatsapp Link</Form.Label>
                                    <Form.Control className={styles.formField} type="url" placeholder="enter whatsapp link" value={whatsapp} onChange={ e => setWhatsapp(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Facebook Link</Form.Label>
                                    <Form.Control className={styles.formField} type="url" placeholder="Enter Facebook Link" value={facebook} onChange={ e => setFacebook(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Map Link</Form.Label>
                                    <Form.Control className={styles.formField} type="url" placeholder="Enter map link" value={map} onChange={ e => setMap(e.target.value) }  />
                                </Form.Group>
                                  
                                        <Button className={styles.formButton} type="submit">
                                        
                                         Set Information
                                    </Button>
                                    <br/>
                                            
                                </form>
                               :  (<form className={styles.formMargin} >
                                 
                               
                                 <Form.Group controlId="formBasicEmail">
                                        <Form.Label>School Name</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter school Name" value={schoolName} onChange={ e => setSchoolName(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Principal's Message</Form.Label>
                                    <Form.Control className={styles.formField} type="text" placeholder="principal's messsage" value={principalMessage} onChange={ e => setPrincipalMessage(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Our Mission</Form.Label>
                                    <Form.Control className={styles.formField} type="text" placeholder="Enter mission statement" value={mission} onChange={ e => setMission(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control className={styles.formField} type="text" placeholder="Enter Address" value={address} onChange={ e => setAddress(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className={styles.formField} type="email" placeholder="Enter Email" value={email} onChange={ e => setEmail(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Phone Numbers(xxxxxxxxxx/xxxxxxxxx)</Form.Label>
                                    <Form.Control className={styles.formField} type="text" placeholder="Enter phone number" value={phoneNo} onChange={ e => setPhoneNo(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Whatsapp Link</Form.Label>
                                    <Form.Control className={styles.formField} type="url" placeholder="enter whatsapp link" value={whatsapp} onChange={ e => setWhatsapp(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Facebook Link</Form.Label>
                                    <Form.Control className={styles.formField} type="url" placeholder="Enter Facebook Link" value={facebook} onChange={ e => setFacebook(e.target.value) }  />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Map Link</Form.Label>
                                    <Form.Control className={styles.formField} type="url" placeholder="Enter map link" value={map} onChange={ e => setMap(e.target.value) }  />
                                </Form.Group>
                                  
                             
                             <Button className={styles.formButton} onClick={() => removeData()}>
                                   
                                    Delete
                               </Button>
                               <Button className={styles.formButton} onClick={() => updateData()}>
                                   
                                   Update
                              </Button>
                               <br/>
                                       
                           </form>)}
                            </div>
                            
                        </div>
                    </Col>

                </Row>
            </div>
        
        
        

        
        </>
    )
}

export default SchoolInfoSetting