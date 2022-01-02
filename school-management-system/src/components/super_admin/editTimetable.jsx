import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Table,Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'



function EditTimetable() {

    const [ timetableData, settimetableData ] = useState([])
    const [ section, setSection ] = useState('')
    const [ sectionData, setSectionData ] = useState([])
    useEffect(async() => {
        await axios.get('/api/getTimetable',{params:{section}})
        .then((res) => {

            res.data.sort((a, b) => (a.day > b.day) ? 1 : -1)
            
            settimetableData(res.data)
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
    }, [section])

    const manageStartHours = (lecStart) => {

        if(lecStart == 8){
            return <td>8 : 00 am</td>
        }
        if(lecStart == 9){
            return <td>9 : 00 am</td>
        }
        if(lecStart == 10){
            return <td>10 : 00 am</td>
        }
        if(lecStart == 11){
            return <td>11 : 00 am</td>
        }
        if(lecStart == 12){
            return <td>12 : 00 pm</td>
        }
        if(lecStart == 13){
            return <td>1 : 00 pm</td>
        }


    }


    const manageEndHours = (lecEnd) => {

        if(lecEnd == 9){
            return <td>9 : 00 am</td>
        }
        if(lecEnd == 10){
            return <td>10 : 00 am</td>
        }
        if(lecEnd == 11){
            return <td>11 : 00 am</td>
        }
        if(lecEnd == 12){
            return <td>12 : 00 pm</td>
        }
        if(lecEnd == 13){
            return <td>1 : 00 pm</td>
        }
        if(lecEnd == 14){
            return <td>2 : 00 pm</td>
        }


    }

    const timetableDataList = () => {
        
        return timetableData.map((timetable) => (
            <tbody>
                <tr>
                    <td>{timetable.title}</td>
                    <td>{timetable.day}</td>
                    <td>{timetable.teacherName}</td>
                    <td>{timetable.lecStart}</td>
                     <td>{timetable.lecEnd}</td>
                    
                    <td><Link to={ '/updateTimetable/' + timetable._id }><Button className={styles.sideButton1}  >
                            Edit</Button></Link></td><td>
                    <Button onClick={() =>  {let flag= window.confirm("Delete  record!")
  if(flag)
  {
                        axios.delete('/api/deleteTimetable/' + timetable._id)
                        .then(res => {
                            const del = timetableData.filter(timetableData => timetable._id !== timetableData._id)
                            settimetableData(del)
                           
                        })}
                    }} className={styles.sideButton2}>Delete</Button></td>
                </tr>
        
            </tbody>

        ))
    }



    return (
        <>

       
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Timetable Data For {section}</h1>
                                </div>
                                <div className="text-center">
                                <select as="select" value={section} onChange={ e => setSection(e.target.value) }>
                                        <option value='' defaultValue>Select Section</option>
                                            {
                                                 sectionData.map((section) => {
                                                     return <option 
                                                        key={section._id}
                                                        value={section.title}>
                                                            {section.title}
                                                    </option>;
                                                    })
                                            }
                                        </select></div>
                                <br/>

                                <Link className={styles.addSecButton} to={ '/viewTimetable' }>Timetable</Link>
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} bordered hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Lecture</th>
                                                <th className={styles.tableHeading}>Day</th>
                                                <th className={styles.tableHeading}>Class Teacher</th>
                                                <th className={styles.tableHeading}>Start time</th>
                                                <th className={styles.tableHeading}>End time</th>
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
        
        
        
        </>
    )
}

export default EditTimetable