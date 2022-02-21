

import React,{useState,useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
const ViewUserAttendance =()=>{
   
    const [userData,setUserData]=useState([])
    const [sectionData,setSectionData]=useState([])
    const [section,setSection]=useState('')
    let today=new Date()
    const [month,setMonth]=useState(parseInt(today.getMonth()+1))
    const search=''
let role=localStorage.getItem("role")
    const [attendanceData, setAttendanceData] = useState([]);
    let[year,setYear] =useState(today.getFullYear())
    const minusYear=()=>{
      setYear(year=>year-1)
      }
    const addYear=()=>{
      setYear(year=>year+1)
    }
    const deleteRecord = async()=>{
        if(month && year ){
        let flag= window.confirm("Delete  record of specific month")
        if(flag)
        { 
          await axios.delete('/api/deleteStudentAttendanceRecord', { params: {month,year,section} })
        }
      }else{
        window.alert('Select month to delete  record')
      }}
      let count=0
      let days=0
      const addDay=()=>days++
      const addAbsent =()=>{count++ 
      
      }
      const initAbsent =() => count=0;
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
    useEffect(()=>{
        
     if(section!=''){
             axios.get('/api/viewStudentAttendance',{ params: {month,year,section}})
            .then(res=>{
               setAttendanceData(res.data)
               
             
          

            })
           }
           if(section!=''){
            const Class=''
            const studentNo=''
           axios.get('/api/students',{ params: {search,Class,section,studentNo}})
          .then(res=>{
              setUserData(res.data)

          })}
     
    },[month,year,section])
    useEffect(()=>{
        axios.get('/api/getSections')
        .then((res) => {
            
            setSectionData(res.data)
            
        })
        .catch(err => {
      console.log(err)
      })
    },[])
  
return(
    <>
    <div className={styles.margLeftRowTable}>
   <div className={styles.empty}></div>
<div className="text-center">{role=='superAdmin'&& <button className={styles.formButton} onClick={() => deleteRecord()}><span>&#9888;</span> Delete Record</button>}
&nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">Print</button> &nbsp;
                   <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''selected>Select Month</option>
                    <option value='1'>January</option>
                    <option value='2'>Februry</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                  </select>&nbsp;&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp; {year} &nbsp;
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
                                        </select>
                  </div>
                            <br/>
                            <div ref={componentRef} >
                            <div className={styles.formHeading}>
                     <h3> Al Khidmat Fazal Noor Campus </h3>
                     <h3> Student Attendance</h3>
                   
                  </div><br/>
<h5>&nbsp; &nbsp; {month ? "Month:"+month:''}&nbsp; &nbsp; {section==''?"Select Section!":section} </h5><br/>
                                   
                                 { attendanceData[0]?
                                  <div className='table-responsive'>
                                 <Table striped bordered hover size='sm'>
                                        <thead>
                                            <th>Student No</th>
                                            <th>Name</th>
                                            {attendanceData.map(j=>{return(<th onClick={addDay()}>{j.date}</th>)})}
                                            <th>Absents</th>
                                        </thead>
                                        <tbody>
                                         { 
                                             userData.map(item=>{return( <tr key={item._id} >
                                               
                                             <td onClick={initAbsent()}>{item.studentNo}</td> 
                                             <td>{item.studentName}</td> 
                                             {attendanceData.map(i=>{return i.presentStudents.find(p=>p == item.studentNo)?
                                             <td style={{color:'green'}}>P</td>
                                             :<td style={{color:'red'}} onClick={addAbsent()} >A</td>  })}
                                             <td>{count}/{days}</td>
                                            </tr > ) })
                                           
                                         } 
                                         
                                        </tbody>
                                    </Table></div>:
                                      <h1 style={{color:'red'}}>No Attendance Yet !</h1>}
                                  
                                

    </div>
    </div>
    </>
)
}
export default ViewUserAttendance