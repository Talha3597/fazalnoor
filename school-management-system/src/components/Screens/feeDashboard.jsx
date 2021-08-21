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
        axios.get('http://localhost:5000/api/getClasses')
        .then((res) => {
           
            setClassData(res.data)
        })
        .catch(err => {
      console.log(err)
      })
      
        axios.get('http://localhost:5000/api/getSections')
        .then((res) => {
            
            setSectionData(res.data)
            
        })
        .catch(err => {
      console.log(err)
      })
      
          async function fetchData(){   
              await axios.get('http://localhost:5000/api/feeDashboard', { params: {month,Class,section,status,year} })
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
                     <div className={styles.Border}>
                         <br/>
                         <div className="text-center">
                   
                         <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''defaultValue>Select Month</option>
                    <option value='Jan'>January</option>
                    <option value='Feb'>Februry</option>
                    <option value='Mar'>March</option>
                    <option value='Apr'>April</option>
                    <option value='May'>May</option>
                    <option value='Jun'>June</option>
                    <option value='Jul'>July</option>
                    <option value='Aug'>August</option>
                    <option value='Sep'>September</option>
                    <option value='Oct'>October</option>
                    <option value='Nov'>November</option>
                    <option value='Dec'>December</option>
                  </select>&nbsp;
&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp;
<select required  as="select" value={status} onChange={ e => setStatus(e.target.value) } >
                    <option value=''defaultValue>Select status</option>
                    <option value='Paid'>Paid</option>
                    <option value='Unpaid'>Unpaid</option>
                   
                  </select>&nbsp;
                  <select required  as="select" value={Class} onChange={ e => setClass(e.target.value) } >
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
                                        <select as="select" value={section} onChange={ e => setSection(e.target.value) } required >
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
                         <form className={styles.formMargin} >
                             
                              <div className={styles.box}><h3>Amount:{data[1]}</h3></div> 
                              <div className={styles.box}><h3>Paid:{data[0]}</h3></div> 
                              <div className={styles.box}><h3>Pending:{data[1]-data[0]}</h3></div>     
                              <div className={styles.box}><h3>No of Paid:{data[2]}</h3></div>     
                               <div className={styles.box}><h3>No of Unpaid:{data[3]}</h3></div>     
                              
                         </form>
                         <br/>
                                   
                                
                            </div>
                            
                        </div>
                        </div>
                    </Col>

                </Row>
            </div>
        
        
        

        
        </>
    )                       
}
export default FeeDashboard