import React, { useState, useEffect,useRef } from 'react'
import styles from '../../assets/css/style.module.css'
import { Row, Col,  Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';


function ViewTimetable() {

    const [ section, setSection ] = useState('')
    const [ sectionData, setSectionData ] = useState([])
    const [ timetable, setTimetable ] = useState([])
    const [ monday, setMonday ] = useState([])
    const [ tuesday, setTuesday ] = useState([])
    const [ wednesday, setWednesday ] = useState([])
    const [ thursday, setThursday ] = useState([])
    const [ friday, setFriday ] = useState([])
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    useEffect(()=>{
        if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
        {  
            window.location="/login"
        }
    },[])
    useEffect(() => {
        axios.get('/api/getTimetable',{params:{section}})
        .then((res) => {
            
            setTimetable(res.data)

            var m = []
            var tu = []
            var w = []
            var th = []
            var f = []

           //res.data.sort((a, b) => (a.lecStart > b.lecStart) ? 1 : -1)

            res.data.forEach(element => {
                if(element.day === 'monday'){
                    m.push(element)
                }
                if(element.day === 'tuesday'){
                    tu.push(element)
                }
                if(element.day === 'wednesday'){
                    w.push(element)
                }
                if(element.day === 'thursday'){
                    th.push(element)
                }
                if(element.day === 'friday'){
                    f.push(element)
                }
            })

            setMonday(m)
            setTuesday(tu)
            setWednesday(w)
            setThursday(th)
            setFriday(f)
        })
        .catch(err => {
            console.log(err)
        })
       axios.get('/api/getSections')
        .then((res) => {
            
            setSectionData(res.data)
            
        })
        .catch(err => {
            console.log(err)
        })
    }, [section])

    

   

    const mondayShow = () => {
        
        if(monday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Monday</td>
        }else{
            var count = 0
            return monday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td> : <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td>
            ))
        }
    }

    const tuesdayShow = () => {
        if(tuesday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Tuesday</td>
        }else{
            var count = 0
            return tuesday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td> : <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td>
            ))
        }
    }

    const wednesdayShow = () => {
        if(wednesday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Wednesday</td>
        }else{
            var count = 0
            return wednesday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td> : <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td>
            ))
        }
    }

    const thursdayShow = () => {
        if(thursday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Thursday</td>
        }else{
            var count = 0
            return thursday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td> : <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td>
            ))
        }
    }

    const fridayShow = () => {
        if(friday.length === 0){
            return <td colSpan='12' className={styles.timetableNolec}>No Lectures on Friday</td>
        }else{
            var count = 0
            return friday.map(day => (
                count++ % 2 != 0 ? <td className={styles.timetableOdd}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td> : <td className={styles.timetableEven}>{day.title}<br/><br/>{day.teacherName}<br/><br/> {day.lecStart}&nbsp;To&nbsp; {day.lecEnd}</td>
            ))
        }
    }


    return (
        <>

        
            <div className={styles.margLeftRow}>
                <Row>
                    <Col md={12}>
                    <div ref={componentRef} >
                        <Row>
                            <Col>
                                <div className={styles.backBar}>
                                    <h1>Timetable For {section}</h1>
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

                                
                            </Col>    
                        </Row>
                        

                        <br/>

                        <Row>
                            <Col>
                                <div className={styles.tableMargin}>
                                
                                    <Table className={styles.tableWidth} hover responsive='sm'>
                                        <thead>
                                            <tr>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Monday</td>
                                                {mondayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Tuesday</td>
                                                {tuesdayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Wednesday</td>
                                                {wednesdayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Thursday</td>
                                                {thursdayShow()}
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: 'bold', border: '1px solid #000000', color: "#366b61"}}>Friday</td>
                                                {fridayShow()}
                                            </tr>
                                        </tbody>
                                        
                                    </Table>
                                    </div>
                                    

                                
                            </Col>
                            
                        </Row>
                        </div>
                        <br/>

                        <div style={{display: 'flex', height: 'auto'}}>
                            <Link className={styles.timetableButton} to={ '/editTimetable' }>Edit Timetable</Link>
                            <Link style={{paddingLeft: '3%'}} className={styles.timetableButton} to={ '/manageTimetable' }>Manage</Link>
                            <button  onClick={handlePrint} style={{paddingLeft: '3%'}} className={styles.timetableButton} type="submit">
                                        
                                        Print
                                       </button>
                        </div>
                        
                        <br/>
                        
                    </Col>

                </Row>
            </div>
        
        
        
        </>
    )
}

export default ViewTimetable