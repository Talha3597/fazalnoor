import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Table ,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios'


const ClassVar = props => (
      
    <tbody>
        <tr>
            <td>{props.classIns.studentNo}</td>
            <td>{props.classIns.studentName}</td>
            <td><Link to={'/manageGrades/' + props.classIns._id}><Button className={styles.sideButton1}  >Grade</Button></Link></td>
            
        </tr>

    </tbody>
        
    
)

function ViewStudents() {

    const { title } = useParams()
    const [ classSectionData, setclassSectionData ] = useState([])

    useEffect(() => {
        axios.get('/api/getStudents/' + title)
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