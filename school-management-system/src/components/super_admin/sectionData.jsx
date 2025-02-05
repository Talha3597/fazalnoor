import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,  useParams } from 'react-router-dom';
import axios from 'axios'
import * as AiIcons from 'react-icons/ai';


const ClassVar = props => (
      
    <tbody>
        <tr>
            <td>{props.classIns.title}</td>
            <td>{props.classIns.studentCount}</td>
            <td>{props.classIns.teacher}</td>
            <td><Link to = {'/viewStudents/' + props.classIns.title}><AiIcons.AiOutlineFolderView className={styles.sideButton6}  /></Link></td>
            <td><Link to={'/updateSection/' + props.classIns._id + '/' + props.classIns.class_id }><AiIcons.AiOutlineEdit className={styles.sideButton1}  /></Link></td>
          <td>  <AiIcons.AiFillDelete onClick={() =>  {
                   let flag= window.confirm("Delete  record!")
                   if(flag)
                   {
                   axios.delete('/api/deleteSection/'+props.classIns._id)
                   .then(response => { 
                       console.log(response.data)
                       window.location = '/sectionData/' + props.classIns.class_id
                    });}
            }} className={styles.sideButton2}/></td>
        </tr>

    </tbody>
        
    
)

function SectionData() {

    const { id } = useParams()
    const [ classSectionData, setclassSectionData ] = useState([])
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    useEffect(() => {
        axios.get('/api/sectionData/' + id)
        .then((res) => {
            console.log(res.data)
            setclassSectionData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    }, [id])

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
                                    <h1>Section Data</h1>
                                </div>

                                <br/>

                                <Link className={styles.addSecButton} to={ '/addSection/' + id }>Add Section</Link>
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                    <Table className={styles.tableWidth} hover bordered responsive size='sm'>
                                        <thead>
                                            <tr>
                                                <th className={styles.tableHeading}>Title</th>
                                                <th className={styles.tableHeading}>Total Students</th>
                                                <th className={styles.tableHeading}>Class Teacher</th>
                                                <th className={styles.tableHeading}></th>
                                                <th className={styles.tableHeading}></th>
                                                <th className={styles.tableHeading}></th>
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

export default SectionData