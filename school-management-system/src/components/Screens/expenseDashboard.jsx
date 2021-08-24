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
                     <div className={styles.Border}>
                         <br/>
                         <div className="text-center">
                   
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
                  </select>&nbsp;&nbsp;<AiIcons.AiFillPlusCircle onClick={ addYear}/>&nbsp;
                  <AiIcons.AiFillMinusCircle onClick={minusYear}/> &nbsp; <button  onClick={handlePrint} className={styles.formButton} type="submit">
                                        
                                        Print
                                       </button>
                  </div>
                  <h5> &nbsp;{month ? "Month:"+month:''}&nbsp;{"Year:"+year}</h5>

                  <br/>
                         <form className={styles.formMargin} >
                             
                              <div className={styles.box}><h3>Amount:{expense}</h3></div> 
                                 
                              
                         </form>
                         <br/><br/>
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
export default ExpenseDashboard