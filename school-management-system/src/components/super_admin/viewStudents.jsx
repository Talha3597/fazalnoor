import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios'


const ClassVar = props => (
      
    <tbody>
        <tr>
            <td>{props.classIns.studentNo}</td>
            <td>{props.classIns.studentName}</td>
            <td><Link to={'/manageGrades/' + props.classIns._id}>Manage Grade</Link></td>
            <td><Link to={'/updateStudents/' + props.classIns._id + '/' + props.classIns.class_id }><span className={[styles['Edel'], 'fas fa-pencil-alt'].join(' ')}></span></Link>
            <button onClick={() =>  {
                   axios.delete('http://localhost:5000/api/deleteSection/'+props.classIns._id)
                   .then(response => { 
                       console.log(response.data)
                       window.location = '/sectionData/' + props.classIns.class_id
                    });
            }} className={styles.Edel2}><span className={[styles['Edel3'], 'fas fa-trash'].join(' ')}></span></button></td>
        </tr>

    </tbody>
        
    
)

function ViewStudents() {

    const { title } = useParams()
    const [ classSectionData, setclassSectionData ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/getStudents/' + title)
        .then((res) => {
            console.log(res.data)
            setclassSectionData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    const classSectionDataList = () => {
        return classSectionData.map((currentclass) => {
          return <ClassVar classIns={currentclass} key={currentclass._id}/>;
        })
    }



    return (
        <>
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Student Grade</h1>
                                </div>

                                

                                
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Admin No</th>
                                                <th className={styles.tableHeading}>Name</th>
                                                <th className={styles.tableHeading}>Grade</th>
                                                <th className={styles.tableHeading}>Actions</th>
                                            </tr>
                                        </thead>

                                        {classSectionDataList()}
                                        
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

export default ViewStudents