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
        const [sectionData,setSectionData]=useState([])
        const [section,setSection]=useState('')
       // console.log(userData)
        const date=todayDate.getFullYear()+'-'+parseInt(todayDate.getMonth()+1)+'-'+todayDate.getDate()
        
        let presentUsers=[]
        const [attendanceData, setAttendanceData] = useState(
            {}
        );
     if(attendanceData[0]){
         presentUsers= attendanceData[0].presentStudents
        
     }
    //  const markAll=()=>{
    //      userData.map(i=>{
    //         const user={"employeeNo":i.employeeNo,"username":i.username}
    //         presentUsers.push(user)
    //      })
    //  }
 
      const handleChange = (studentNo) => {
       
        const name=presentUsers.find(i=>{return i==studentNo})
 if(name){
    presentUsers = presentUsers.filter(i=>{return i!=studentNo})
}
else{
    presentUsers.push(studentNo)
    
}
            
       };
  
        useEffect(async()=>{
           
            if(section !=''){
              
                await axios.get('/api/getStudentAttendance',{ params: {date,section}})
                .then(res=>{
                    
                setAttendanceData(res.data)
                if(!attendanceData[0]) {
                    const Class =''
                    const search =''
                    const studentNo =''
                   
    
                    axios.get('/api/students',{ params: {search,Class,section,studentNo}})
                   .then(res=>{
                       setUserData(res.data)
                      
                   })
                  }
                
                })
            }
            
         
        },[date,section])
        useEffect(()=>{
            axios.get('/api/getSections')
            .then((res) => {
                
                setSectionData(res.data)
                
            })
            .catch(err => {
          console.log(err)
          })
        },[])
        const onSubmit=async()=>{
           
          if(attendanceData[0]){
            let users=[]
            users=userData.map(i=>users[i]=i.studentNo)   
            let absentUsers =users.filter(el=>{return !presentUsers.find(element =>{
                    return element === el
                })})
           
            await axios.put('/api/updateStudentAttendance',{date,section,presentUsers,absentUsers})
            alert("Updated Attendance")
          }else{
            let users=[]
            users=userData.map(i=>users[i]=i.studentNo)   
            let absentUsers =users.filter(el=>{return !presentUsers.find(element =>{
                    return element === el
                })})
             
          
            await axios.post('/api/markStudentAttendance',{date,section,presentUsers,absentUsers})
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
                                                />&nbsp;&nbsp;
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
                                        </Form.Group>
                                       
                                       {attendanceData[0]?
                                        <div className='table-responsive'>
                                       <Table striped bordered hover size='sm'>
                                            <thead>
                                           
                                                <th>Student No</th>
                                                <th>Attendance</th>
                                            </thead>
                                            <tbody>
                                            {
                                                 attendanceData[0].presentStudents.map(item=>{return( <tr key={item}>
                                                 <td>{item}</td>
                                                 <td><input type='checkbox' defaultChecked  onClick={()=>handleChange(item)} /></td>
                                                </tr> ) })
                                               
                                             }
                                            {
                                                attendanceData[0].absentStudents.map((item)=>{return <tr key={item}>
                                                <td>{item}</td>
                                                <td><input type='checkbox'  onClick={()=>handleChange(item)} /></td>
                                               </tr>  })
                                              
                                            }
                                             
                                            </tbody>
                                        </Table></div>:
                                        <div className='table-responsive'>
                                            <Table striped bordered hover size='sm'>
                                            <thead>
                                                <th >Student Number</th>
                                                <th>Name</th>
                                                <th>Attendance</th>
                                            </thead>
                                            <tbody>
                                             {
                                                 userData.map(item=>{return( <tr key={item._id}>
                                                 <td>{item.studentNo}</td>
                                                 <td>{item.studentName}</td>
                                                 <td><input type='checkbox'  onClick={()=>handleChange(item.studentNo)} /></td>
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
        
      