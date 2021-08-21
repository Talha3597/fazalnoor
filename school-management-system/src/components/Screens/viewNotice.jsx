import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const UpdateNotice =  ({match})=> {
    const id=match.params.id
    // const [message, setMessage]=useState("")
    const [ notice, setNotice ] = useState('')
    const [ url, setUrl ] = useState('')
    const [title,setTitle]= useState('')
    
   const [ status, setStatus ] = useState('')
   useEffect(()=>{
    async function fetchData(){   
        await axios.get('http://localhost:5000/api/notice' ,{ params: {id} })
        .then(res=>{
            
            setTitle(res.data.title)
            setUrl(res.data.url)
            setNotice(res.data.notice)
            
            setStatus(res.data.status)
            
        })
       }
       
 fetchData()
 

},[id]
)   

       


    

    return (
        <>

      
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1> Notice</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                 
                                <form className={styles.formMargin} >
                               
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control readOnly disabled className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Notice</Form.Label>
                                        <Form.Control readOnly disabled className={styles.formField} as="textarea"  rows="10" placeholder="Enter Notice" value={notice} onChange={ e => setNotice(e.target.value) } required />
                                    </Form.Group>
                                    
                                     <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Url</Form.Label>
                                        <Form.Control readOnly disabled className={styles.formField} type="url" placeholder="Enter url " value={url} onChange={ e => setUrl(e.target.value) }/>
                                    </Form.Group>
                                    
                                    
                                    

                                   
                                      <div class="form-check">
                                    <input readOnly disabled class="form-check-input" type="radio"  id="active" checked={status === 'active'} value="active" onClick={() => setStatus('active')}/>
                                    <label class="form-check-label" for="active">
                                        Active
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input readOnly disabled class="form-check-input" type="radio"  id="inactive" checked={status === 'inactive'} value="inactive" onClick={() => setStatus('inactive')}/>
                                    <label class="form-check-label" for="inactive">
                                        Inactive
                                    </label>
                                    </div>
                                    
                                    
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

export default UpdateNotice