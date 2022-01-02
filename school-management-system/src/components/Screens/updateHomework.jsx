import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import  Sidebar  from './privateScreen';
const UpdateHomework =  ({match,history})=> {
    const id=match.params.id
    // const [message, setMessage]=useState("")
    const [ notice, setNotice ] = useState('')
    const [ url, setUrl ] = useState('')
    const [title,setTitle]= useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
   const [ status, setStatus ] = useState('')
   const [message, setMessage]=useState("")
   
   useEffect(()=>{
    async function fetchData(){   
        await axios.get('/api/homework' ,{ params: {id} })
        .then(res=>{
            
            setTitle(res.data.title)
            setUrl(res.data.url)
            setNotice(res.data.notice)
            setClass(res.data.Class)
            setSection(res.data.section)
            setStatus(res.data.status)
            
        })
       }
       
 fetchData()
 

},[id]
)   

    const onSubmit = async() => {
       
          
        await axios.put(`/api/updateHomework/${id}`,{id,title,notice,url,Class,section,status})
        setTimeout(()=>{
            setMessage("")
            history.push(`/updateHomework/${id}`)
            
            },4000)
           return setMessage("HomeWork Updated")
    }

    return (
        <>

      
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Update Homework</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
   {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             
                            

                                <form className={styles.formMargin} onSubmit={onSubmit}>
                                    
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Homework</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea"  rows="10" placeholder="Enter Homework" value={notice} onChange={ e => setNotice(e.target.value) } required />
                                    </Form.Group>
                                    
                                     <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Url</Form.Label>
                                        <Form.Control className={styles.formField} type="url" placeholder="Enter url " value={url} onChange={ e => setUrl(e.target.value) }/>
                                    </Form.Group>
                                    
                                      <div class="form-check">
                                    <input class="form-check-input" type="radio"  id="active" checked={status === 'active'} value="active" onClick={() => setStatus('active')}/>
                                    <label class="form-check-label" for="active">
                                        Active
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio"  id="inactive" checked={status === 'inactive'} value="inactive" onClick={() => setStatus('inactive')}/>
                                    <label class="form-check-label" for="inactive">
                                        Inactive
                                    </label>
                                    </div>
                                    <Button className={styles.formButton} type="submit">
                                        
                                        Update Homework
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

export default UpdateHomework