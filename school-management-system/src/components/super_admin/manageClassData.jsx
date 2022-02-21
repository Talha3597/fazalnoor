import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';
function ManageClassData() {

    const [ timetableData, settimetableData ] = useState([])
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
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
                    
                    <td><Link to={ '/updateClass/' + timetable._id }><AiIcons.AiOutlineEdit className={styles.sideButton1}  /></Link></td>

                    <td><AiIcons.AiFillDelete onClick={() =>  {
                        let flag= window.confirm("Delete  record!")
                        if(flag)
                        {
                        axios.delete('/api/deleteClass/' + timetable._id)
                        .then(response => { 
                            console.log(response.data)
                            window.location = '/manageClassData'
                            });}
                    }} className={styles.sideButton2}/></td>
                </tr>
        
            </tbody>

        ))
    }



    return (
        <>

        
        <div className={styles.overflow}>
           

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
                                    <Table className={styles.tableWidth} bordered hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Title</th>
                                                <th className={styles.tableHeading}>Incharge</th>
                                                <th className={styles.tableHeading}></th>
                                                <th className={styles.tableHeading}></th>
                                                
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