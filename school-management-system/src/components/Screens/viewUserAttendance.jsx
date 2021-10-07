

import React,{useState,useEffect} from 'react'
import styles from '../../assets/style.module.css'
import { Button,Form,Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';
const ViewUserAttendance =()=>{
   
    const [userData,setUserData]=useState([])
    let today=new Date()
    const [month,setMonth]=useState(parseInt(today.getMonth()+1))
    const search=''
    const employeeNo=''
    let count=0
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
          await axios.delete('/api/deleteAttendanceRecord', { params: {month,year} })
        }
      }else{
        window.alert('Select month to delete  record')
      }}
  
    useEffect(()=>{
        
        async function fetchUserData(){   
            await axios.get('/api/auth/users',{ params: {search,employeeNo}})
            .then(res=>{
                setUserData(res.data)
                console.log(res.data)
            })
           }
           async function fetchAttendanceData(){   
            await axios.get('/api/viewAttendance',{ params: {month,year}})
            .then(res=>{
               setAttendanceData(res.data)
               

            })
           }
     fetchUserData()
     fetchAttendanceData()
    },[month,year])
  
return(
    <>
    <div className={styles.viewMargin}>
    <div className={styles.backBar}>
                                <h1>View Staff Attendance</h1>
                                
                            </div>
                            <div className="text-center">
                   
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
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp; {year}&nbsp;
                            {role=='superAdmin'? <button className={styles.formButton} onClick={() => deleteRecord()}>
        <span>&#9888; </span> Delete Record
                            </button>:''} &nbsp;</div>
                            <br/>
    
                                   
                                 { attendanceData[0]?<Table size='sm'>
                                        <thead>
                                            <th>Employee No</th>
                                            <th>Name</th>
                                            {attendanceData.map(j=>{return(<th>{j.date}</th>)})}
                                        </thead>
                                        <tbody>
                                         { 
                                             userData.map(item=>{return( <tr key={item._id}>
                                             <td>{item.employeeNo}</td>
                                             <td>{item.username}</td> 
                                             {attendanceData.map(i=>{return i.presentUsers.find(p=>p.employeeNo == item.employeeNo)?
                                             <td style={{color:'green'}}>P</td>
                                             :<td style={{color:'red'}}>A</td>})}
                                            </tr> ) })
                                           
                                         } 
                                         
                                        </tbody>
                                    </Table>:
                                     
                                    <Table size='sm'>
                                        <thead>
                                            <th>Employee No</th>
                                            <th>Name</th>
                                            
                                        
                                        </thead>
                                        <tbody>
                                         {
                                             userData.map(item=>{return( <tr key={item._id}>
                                             <td>{item.employeeNo}</td>
                                             <td>{item.username}</td> 
                                             
                                            </tr> ) })
                                           
                                         } 
                                         
                                        </tbody>
                                    </Table>}
                                  
                                

    </div>
    
    </>
)
}
export default ViewUserAttendance