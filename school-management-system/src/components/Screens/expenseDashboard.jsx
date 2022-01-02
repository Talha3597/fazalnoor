import React, { useState, useEffect,useRef} from 'react'
import styles from '../../assets/style.module.css'
import { Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import * as AiIcons from 'react-icons/ai';
import axios from 'axios'

import { useReactToPrint } from 'react-to-print';




const ExpenseDashboard =  ()=> {
   const [data,setData]=useState('')
   const [month,setMonth]=useState('')
   let today=new Date()
   let[year,setYear] =useState( today.getFullYear())
   const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
const minusYear=()=>{
  setYear(year=>year-1)
  }
const addYear=()=>{
  setYear(year=>year+1)
}

const expense=Number(data.toString().split('+')[0])+Number(data.toString().split('+')[1])

    useEffect(()=>{
        async function fetchData(){   
            await axios.get('/api/expenseDashboard', { params: {month,year} })
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
                     <h1>Expense </h1>
                 </div>
                
                 <div className={styles.formStyle}>
                     
                         <br/>
                         <div className="text-center">
                   
                         <select   as="select" value={month} onChange={ e => setMonth(e.target.value) } >
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
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp; <button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
                  </div>
                  <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>

                  <br/>
                         <form className={styles.margLeftRowTable} >
                         <div className={styles.card}>
                                <h2>Amount</h2>
                                <h3>{expense}</h3> 
                                </div>
                                 
                              
                         </form>
                         <br/><br/>
                                <br/>
                           
                            </div>
                        </div>
                    </Col>

                </Row>
            </div>
           
        
        

        
        </>
    )                       
}
export default ExpenseDashboard