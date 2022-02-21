import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useParams } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';

function AddSection(){
    

    const { id } = useParams()
    const [ title, setTitle ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ description, setDescription ] = useState('')
  
    const [ sectionClass, setClass ] = useState({})
      const spaceClean=()=>{
          setTitle('')
          setDescription('')
          setMessage('')
      }
      useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    useEffect(() => {
        axios.get('/api/singleClass/' + id)
            .then((res) => {
                console.log(res.data)
                setClass(res.data)
            })
            .catch(err => {
				console.log(err)
			})

            
    }, [id])


    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
            $('#description').fadeOut(100)
            $('#teacher').fadeOut(100)
            $('#Class').fadeOut(100)


        if(title !== '' ){


            const section = {
                title,
                description,
                class_id: id,
                classTitle: sectionClass.title
            }

            axios.post('/api/addSection', section)
                .then(res => {
                    setTimeout(() => {
                        spaceClean()
                     }, 4000);
                     return setMessage("Section Added");

                })
                .catch(err => console.log('error : ' + err))
        }else{
            document.classForm.classList.add('was-validated')
            if(title === ''){
                $('#title').fadeIn(100)
            }

            if(description === ''){
                $('#description').fadeIn(100)
            }

          
            
            
        }
    }


    return (
        <>

            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Add New Section</h1>
                        </div>

                        <br/>

                        <h3 className={styles.classTitle}>{sectionClass.title}</h3>

                        <br/>
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                            {message && <Button  className={styles.sideButton4} autoFocus >{message}</Button>}             

                                <form className={styles.formMargin} onSubmit={onSubmit}>

                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) } required/>
                                        <Form.Text id="title" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide title for Section.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } />
                                        <Form.Text id="description" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide description for Section.
                                        </Form.Text>
                                    </Form.Group>


                                  

                                    <Button className={styles.formButton} type="submit">
                                        
                                        Add New Section
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

export default AddSection