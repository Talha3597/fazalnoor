import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery';

function UpdateClass(){

    const { id_1 } = useParams()
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ teacher, setTeacher ] = useState('')
    const [ sectionClass, setSectionClass ] = useState({})
    const [ stclassData, setClassTitle ] = useState([])
    const [ currentClass, setClass ] = useState('')

    useEffect(() => {
        axios.get('/api/singleClass/' + id_1)
            .then((res) => {
                console.log(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                setTeacher(res.data.incharge)
                
            })
            .catch(err => {
				console.log(err)
			})

            

            
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()

        
            $('#title').fadeOut(100)
            $('#description').fadeOut(100)
            $('#teacher').fadeOut(100)
            $('#studentClass').fadeOut(100)


        if(title !== '' && description !== '' && teacher !== ''){

            const section = {
                title,
                description,
                incharge: teacher,
                
            }

            axios.post('/api/updateCLass/' + id_1 , section)
                .then(res => {
                    console.log(res.data)
                    window.location = '/manageClassData'
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

            if(teacher === ''){
                $('#teacher').fadeIn(100)
            }
            
            
        }
    }


    return (
        <>

        <Navbar className={styles.respNav} expand="lg">
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color: '#ffffff'}}/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                    <Nav.Link className={styles.NavLink} href="#">Classes</Nav.Link>
                
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

        <div className={styles.overflow}>
            <div className={styles.background}>
                <div className={styles.topSet}>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                    <Link to='#' className={styles.navLink2}>Classes</Link>
                </div>
            </div>

            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <div className={styles.backBar}>
                            <h1>Update Class Data</h1>
                        </div>

                        
                        
                        <div className={styles.formStyle}>
                            <div className={styles.Border}>
                                <br/>
                                <form className={styles.formMargin} onSubmit={onSubmit}>

                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Enter Title" value={title} onChange={ e => setTitle(e.target.value) }/>
                                        <Form.Text id="title" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide title for Class.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className={styles.formField} as="textarea" placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } />
                                        <Form.Text id="description" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide description for Class.
                                        </Form.Text>
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Incharge</Form.Label>
                                        <Form.Control className={styles.formField} type="text" placeholder="Incharge" value={teacher} onChange={ e => setTeacher(e.target.value) } />
                                        <Form.Text id="teacher" className={styles.authtextF1} style={{display: 'none'}}>
                                            Please provide Incharge for Section.
                                        </Form.Text>
                                    </Form.Group>


                                    <Button className={styles.formButton} type="submit">
                                        
                                        Update Class
                                    </Button>
                                    
                                </form>

                                <br/>
                            </div>
                            
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
        
        

        
        </>
    )
}

export default UpdateClass