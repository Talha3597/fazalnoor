import React, { useState, useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col,Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';

import axios from 'axios'

const SalaryDashboard =  ()=> {
   const [data,setData]=useState([])
   const [month,setMonth]=useState('')
   let[status,setStatus] =useState('') 
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
        async function fetchData(){   
            await axios.get('/api/salaryDashboard', { params: {month,status,year} })
            .then(res=>{
                setData(res.data)
                
            })
           }
           
     fetchData()
    
    },[month,status,year]
    )
    
    

return (
 <>

  
     <div className={styles.margLeftRow}>
            <Row>
             <Col md={12}><div ref={componentRef} >
                 <div className={styles.backBar}>
                     <h1>Salary Dashboard </h1>
                 </div>
                
                 <div className={styles.formStyle}>
                     <div className={styles.Border}>
                         <br/>
                         <div className="text-center">
                         &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>&nbsp;
                         <select required  as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''selected>Select Month</option>
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
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> 
                  
  <select required  as="select" value={status} onChange={ e => setStatus(e.target.value) } >
                   <option value=''selected>Select status</option>
                   <option value='Paid'>Paid</option>
                   <option value='Unpaid'>Unpaid</option>
                  
                 </select>&nbsp;
               </div>
               <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
                
                         <form className={styles.formMargin} >
                               <div className={styles.box}><h3>Amount:{data[1]}</h3></div> 
                              <div className={styles.box}><h3>Paid:{data[0]}</h3></div> 
                              <div className={styles.box}><h3>Pending:{data[1]-data[0]}</h3></div>     
                              <div className={styles.box}><h3># of Paid:{data[2]}</h3></div> 
                              <div className={styles.box}><h3># of UnPaid:{data[3]}</h3></div> 
                              
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
export default SalaryDashboard