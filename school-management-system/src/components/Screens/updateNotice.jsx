import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col, Form, Button, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import  Sidebar  from './privateScreen';
const UpdateNotice =  ({match,history})=> {
    const id=match.params.id
    // const [message, setMessage]=useState("")
    const [ notice, setNotice ] = useState('')
    const [ url, setUrl ] = useState('')
    const [title,setTitle]= useState('')
    const [ Class, setClass ] = useState('')
    const [ section, setSection ] = useState('')
   const [ status, setStatus ] = useState('')
   const [ classData, setClassData ] = useState([])
   const [ sectionData, setSectionData ] = useState([])
  
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

  
   
    async function fetchData(){   
        await axios.get('http://localhost:5000/api/notice' ,{ params: {id} })
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
       
          
       const {data}= await axios.put(`http://localhost:5000/api/updateNotice/${id}`,{id,title,notice,url,Class,section,status})
      
        history.push(`/notices`)
    }

    return (
        <>

      
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Update Notice</h1>
                        </div>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                 
                                <form className={styles.formMargin} onSubmit={onSubmit}>
                               
                                <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Notice</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea"  rows="10" placeholder="Enter Notice" value={notice} onChange={ e => setNotice(e.target.value) } required />
                                    </Form.Group>
                                    
                                     <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Url</Form.Label>
                                        <Form.Control className={styles.formField} type="url" placeholder="Enter url " value={url} onChange={ e => setUrl(e.target.value) }/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formBasicstudentClass">
                                        <Form.Label>Class</Form.Label>
                                        <Form.Control required className={styles.formField} as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option selected> Class</option>
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
                                        <option selected> Section</option>
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
                                    </Form.Group>      
                               <div class="form-check">
                                    <input class="form-check-input" type="radio"  id="active" checked={status === 'public'} value="public" onClick={() => setStatus('public')}/>
                                    <label class="form-check-label" for="active">
                                        Public
                                    </label>
                                    </div>
                                    <div class="form-check">
                                    <input class="form-check-input" type="radio"  id="inactive" checked={status === 'private'} value="private" onClick={() => setStatus('private')}/>
                                    <label class="form-check-label" for="inactive">
                                        Private
                                    </label>
                                    </div>
                                    <Button className={styles.formButton} type="submit">
                                        
                                        Update Notice
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

export default UpdateNotice