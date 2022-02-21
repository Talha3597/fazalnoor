import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';


const ClassVar = props => (
      
    <tbody>
        <tr>
            <td>{props.classIns.studentNo}</td>
            <td>{props.classIns.studentName}</td>
            <td><Link to={'/manageGrades/' + props.classIns._id}><AiIcons.AiOutlineFileAdd className={styles.sideButton1}  /></Link></td>
            <td ><Link to={`/viewGradesStudent/${props.classIns.studentNo}`}>
                        <AiIcons.AiOutlineFolderView className={styles.sideButton5} /></Link></td>  
        </tr>

    </tbody>
        
    
)

function ViewStudents() {

    const { title } = useParams()
    const [ classSectionData, setclassSectionData ] = useState([])
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    useEffect(() => {
        axios.get('/api/getStudents/' + title)
        .then((res) => {
            console.log(res.data)
            setclassSectionData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [title])

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
                                    <Table className={styles.tableWidth}bordered hover responsive='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Admin No</th>
                                                <th className={styles.tableHeading}>Name</th>
                                                <th className={styles.tableHeading}>Add Grades</th>
                                                <th className={styles.tableHeading}>View Grades</th>
                                                
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