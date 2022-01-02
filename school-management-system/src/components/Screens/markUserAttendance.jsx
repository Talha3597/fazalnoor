import React,{useState,useEffect} from 'react'
    import styles from '../../assets/style.module.css'
    import { Button,Form,Table} from 'react-bootstrap'
    import 'bootstrap/dist/css/bootstrap.min.css';
    import DatePicker from 'react-datepicker';
    import "react-datepicker/dist/react-datepicker.css";
    import axios from 'axios';
    const MarkUserAttendance =()=>{
        const [todayDate,setTodayDate]=useState(new Date)
        const [userData,setUserData]=useState([])
       // console.log(userData)
        const date=todayDate.getFullYear()+'-'+parseInt(todayDate.getMonth()+1)+'-'+todayDate.getDate()
        const search=''
        const employeeNo=''
        let presentUsers=[]
        const [attendanceData, setAttendanceData] = useState([]);
     if(attendanceData[0]){
          attendanceData[0].presentUsers.forEach((x)=>{
             presentUsers.push({"employeeNo":x.employeeNo,"username":x.username})
         })
     }
    //  const markAll=()=>{
    //      userData.map(i=>{
    //         const user={"employeeNo":i.employeeNo,"username":i.username}
    //         presentUsers.push(user)
    //      })
    //  }

      const handleChange = (employeeNo,username) => {
       
        const name=presentUsers.find(p=>p.employeeNo == employeeNo)
                     if(name){
                        presentUsers = presentUsers.filter(p =>p.employeeNo !== employeeNo)
                       
                      
                    }
                    else{
                        const user={"employeeNo":employeeNo,"username":username}
                        presentUsers.push(user)
                        
                       
                    }
            
       };
    
        useEffect(()=>{
            
            async function fetchUserData(){   
                await axios.get('/api/auth/users',{ params: {search,employeeNo}})
                .then(res=>{
                    setUserData(res.data)
                    
                })
               }
               async function fetchAttendanceData(){   
                await axios.get('/api/getAttendance',{ params: {date}})
                .then(res=>{
                   setAttendanceData(res.data)
                   
                   
                })
               }
         fetchUserData()
         fetchAttendanceData()
        },[date])
        const onSubmit=async()=>{
           
          if(attendanceData[0]){
            let absentUsers =userData.filter(el=>{return !presentUsers.find(element =>{
                return element.employeeNo === el.employeeNo
            })})
           
            await axios.put('/api/updateAttendance',{date,presentUsers,absentUsers})
            alert("Updated Attendance")
          }else{
    
            let absentUsers =userData.filter(el=>{return !presentUsers.find(element =>{
                return element.employeeNo === el.employeeNo
            })})
           
            await axios.post('/api/markAttendance',{date,presentUsers,absentUsers})
            alert("Submit Attendance")
          }
             
           
        }
    return(
        <>
        <div className={styles.formMargin}>
        <div className={styles.backBar}>
                                    <h1>Staff Attendance</h1>
                                    
                                </div>
    
                                <br/>
        
                                    <form className={styles.tableMargin} onSubmit={onSubmit}>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Select Date:</Form.Label><br/>
                                            <DatePicker
                                                selected={todayDate}
                                                onChange={date => setTodayDate(date)}
                                                />
                                        </Form.Group>
                                       {attendanceData[0]?
                                        <div className='table-responsive'>
                                       <Table striped bordered hover size='sm'>
                                            <thead>
                                           
                                                <th>Employee No</th>
                                                <th>Name</th>
                                                <th>Attendance</th>
                                            </thead>
                                            <tbody>
                                            {
                                                attendanceData[0].absentUsers.map(item=>{return( <tr key={item._id}>
                                                <td>{item.employeeNo}</td>
                                                <td>{item.username}</td>
                                                <td><input type='checkbox'  onClick={()=>handleChange(item.employeeNo,item.username)} /></td>
                                               </tr> ) })
                                              
                                            }
                                             {
                                                 attendanceData[0].presentUsers.map(item=>{return( <tr key={item._id}>
                                                 <td>{item.employeeNo}</td>
                                                 <td>{item.username}</td>
                                                 <td><input type='checkbox' defaultChecked  onClick={()=>handleChange(item.employeeNo,item.username)} /></td>
                                                </tr> ) })
                                               
                                             }
                                            </tbody>
                                        </Table></div>:
                                        <div className='table-responsive'>
                                            <Table striped bordered hover size='sm'>
                                            <thead>
                                                <th >Employee No</th>
                                                <th>Name</th>
                                                <th>Attendance</th>
                                            </thead>
                                            <tbody>
                                             {
                                                 userData.map(item=>{return( <tr key={item._id}>
                                                 <td>{item.employeeNo}</td>
                                                 <td>{item.username}</td>
                                                 <td><input type='checkbox'  onClick={()=>handleChange(item.employeeNo,item.username)} /></td>
                                                </tr> ) })
                                               
                                             }
                                            </tbody>
                                        </Table></div>
                                         }
                                        <Button className={styles.formButton} type="submit"> Submit Attendance
                                        </Button>
                                      
                                    </form>
    
        </div>
        
        </>
    )
    }
    export default MarkUserAttendance
        
      