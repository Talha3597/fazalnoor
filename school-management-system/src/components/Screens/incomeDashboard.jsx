import React, { useState, useEffect,useRef } from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';

 


const IncomeDashboard =  ()=> {
    let today=new Date()
   const [data,setData]=useState('')
   const [month,setMonth]=useState(parseInt(today.getMonth()+1))
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
    if(!localStorage.getItem("authToken") || !localStorage.getItem("role"))
    {  
        window.location="/login"
    }
},[])
    useEffect(()=>{
        async function fetchData(){   
            await axios.get('/api/incomeDashboard', { params: {month,year} })
            .then(res=>{
                setData(res.data)
                
            })
           }
           
     fetchData()
    
    },[month,year]
    )
    
    

return (
 <>

  
     <div className={styles.margLeftRow}>
            <Row>
             <Col md={12}><div ref={componentRef} >
                 <div className={styles.backBar}>
                     <h1>Income Dashboard</h1>
                 </div>
                
                 <div className={styles.formStyle}>
                     
                         <br/>
                         <div className="text-center">
                         &nbsp;<button  onClick={handlePrint} className={styles.formButton} type="submit"> Print </button>
                         &nbsp;<select   as="select" value={month} onChange={ e => setMonth(e.target.value) } >
                    <option value=''>{year}</option>
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
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> </div>
                  <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>
                         <form className={styles.margLeftRowTable} >
                              
                              
                              <div className={styles.cardLarge}>
                                <h2>Amount</h2>
                                <h3>{data}</h3> 
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
export default IncomeDashboard