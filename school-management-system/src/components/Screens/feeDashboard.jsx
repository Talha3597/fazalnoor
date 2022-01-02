import React, { useState, useEffect,useRef } from 'react'

import styles from '../../assets/style.module.css'
import { Row, Col, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';

 


const FeeDashboard =  ()=> {
   const [data,setData]=useState([])
   const [month,setMonth]=useState('')
   let[status,setStatus] =useState('') 
   const [ classData, setClassData ] = useState([])
   const [ Class, setClass ] = useState('')
   const [ section, setSection ] = useState('')    
   const [ sectionData, setSectionData ] = useState([])
   let today=new Date()
   let[year,setYear] =useState( today.getFullYear())
const minusYear=()=>{
  setYear(year=>year-1)
  }
const addYear=()=>{
  setYear(year=>year+1)
}
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
   
    useEffect(()=>{
        axios.get('/api/getClasses')
        .then((res) => {
           
            setClassData(res.data)
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
      
          async function fetchData(){   
              await axios.get('/api/feeDashboard', { params: {month,Class,section,status,year} })
              .then(res=>{
                  setData(res.data)
                  
              })
             }
             
       fetchData()
      
      
      },[month,status,Class,section,year]
      )
    
    

return (
 <>

  
     <div className={styles.margLeftRow}>
            <Row>
             <Col md={12}><div ref={componentRef} >
                 <div className={styles.backBar}>
                     <h1> Fee Dashboard </h1>
                 </div>
                
                 <div className={styles.formStyle}>
                     
                         <br/>
                         <div className="text-center">
                   
                         <select   as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''defaultValue>Select Month</option>
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
                   
                  </select>&nbsp;
&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;
<select   as="select" value={status} onChange={ e => setStatus(e.target.value) } >
                    <option value=''defaultValue>Select status</option>
                    <option value='Paid'>Paid</option>
                    <option value='Unpaid'>Unpaid</option>
                   
                  </select>&nbsp;
                  <select   as="select" value={Class} onChange={ e => setClass(e.target.value) } >
                                          <option value='' defaultValue>Select Class</option>
                                            {   
                                                 classData.map((classIns,idx) => {
                                                     return <option 
                                                        key={classIns._id}
                                                        value={classIns.title}>
                                                            {classIns.title}
                                                    </option>;
                                                    })
                                            }
                                        </select>
                                   
                                        &nbsp;
                                        <select as="select" value={section} onChange={ e => setSection(e.target.value) }  >
                                        <option value='' defaultValue>Select Section</option>
                                            {
                                                 sectionData.map((section,idx) => {
                                                     return <option 
                                                        key={section._id}
                                                        value={section.title}>
                                                            {section.title}
                                                    </option>;
                                                    })
                                            }
                                        </select>&nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
                                   <br/>
                                        <h5> {Class ? "Class:"+Class:''}&nbsp;{section ? "Section:"+section:''}&nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>         
</div>
<br/>
                         <form className={styles.margLeftRowTable} >
                         <div className={styles.card}>
                                <h2>Amount</h2>
                                <h3>{data[1]}</h3> 
                                </div>
                                <div className={styles.card}>
                                <h2>Paid</h2>
                                <h3>{data[0]}</h3> 
                                </div>
                                
                                <div className={styles.card}>
                                <h2>Pending</h2>
                                <h3>{data[1]-data[0]}</h3> 
                                </div>
                                <div className={styles.card}>
                                <h2># of Paid</h2>
                                <h3>{data[2]}</h3> 
                                </div>
                                <div className={styles.card}>
                                <h2># of UnPaid</h2>
                                <h3>{data[3]}</h3> 
                                </div>
                        
                              
                         </form>
                         <br/>
                                   
                                
                           
                            
                        </div>
                        </div>
                    </Col>

                </Row>
            </div>
        
        
        

        
        </>
    )                       
}
export default FeeDashboard