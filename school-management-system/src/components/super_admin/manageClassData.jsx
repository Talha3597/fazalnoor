import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Navbar, Nav, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios'




function ManageClassData() {

    const [ timetableData, settimetableData ] = useState([])

    useEffect(() => {
        axios.get('/api/getClasses')
        .then((res) => {
            console.log(res.data)
            
            settimetableData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    

    const timetableDataList = () => {
        
        return timetableData.map((timetable) => (
            <tbody>
                <tr>
                    <td>{timetable.title}</td>
                    <td>{timetable.incharge}</td>
                    
                    <td><Link to={ '/updateClass/' + timetable._id }><span className={[styles['Edel'], 'fas fa-pencil-alt'].join(' ')}></span></Link>
                    <button onClick={() =>  {
                        let flag= window.confirm("Delete  record!")
                        if(flag)
                        {
                        axios.delete('/api/deleteClass/' + timetable._id)
                        .then(response => { 
                            console.log(response.data)
                            window.location = '/manageClassData'
                            });}
                    }} className={styles.Edel2}><span className={[styles['Edel3'], 'fas fa-trash'].join(' ')}></span></button></td>
                </tr>
        
            </tbody>

        ))
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
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Class List</h1>
                                </div>

                                <br/>

                                
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Title</th>
                                                <th className={styles.tableHeading}>Incharge</th>
                                                <th className={styles.tableHeading}>Actions</th>
                                                
                                            </tr>
                                        </thead>

                                        {timetableDataList()}
                                        
                                    </Table>
                                </div>
                            </Col>
                            
                        </Row>
                        
                        
                        
                    </Col>

                </Row>
            </div>
        </div>
        
        
        </>
    )
}

export default ManageClassData