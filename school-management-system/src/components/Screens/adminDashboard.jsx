import React, { useState,useEffect } from 'react'
import styles from '../../assets/style.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
const Dashboard =  ()=> {
    let [incomeData,setIncomeData]=useState('')
    let [expenseData,setExpenseData]=useState('')
    let [studentData,setStudentData]=useState(0)
    let [userData,setUserData]=useState(0)
    let [classesData,setClassesData]=useState([])
    let [sectionData,setSectionData]=useState([])
    const month=''
    const year=''
const expense=Number(expenseData.toString().split('+')[0])+Number(expenseData.toString().split('+')[1])

  
    useEffect(()=>{
        async function fetchIncomeData(){   
            await axios.get('/api/incomeDashboard', { params: {month,year}} )
            .then(res=>{
                setIncomeData(res.data)
                console.log(res.data)
            })
           }
           async function fetchExpenseData(){   
            await axios.get('/api/expenseDashboard', { params: {month,year} })
            .then(res=>{
                setExpenseData(res.data)
                
            })
           }
           async function fetchStudentData(){   
            await axios.get('/api/totalStudents')
            .then(res=>{
                setStudentData(res.data)
                
            })
           }
           async function fetchUserData(){   
            await axios.get('/api/auth/totalUsers')
            .then(res=>{
                setUserData(res.data)
                
            })
           }
           async function fetchClassData(){   
            await axios.get('/api/totalClasses')
            .then(res=>{
                setClassesData(res.data)
                console.log(res.data)
            })
           }
           async function fetchSectionData(){   
            await axios.get('/api/totalSections')
            .then(res=>{
                setSectionData(res.data)
                
            })
           }
     fetchStudentData()
     fetchUserData()
     fetchExpenseData()
     fetchIncomeData()
     fetchClassData()
     fetchSectionData()
    
    },[]
    )
    
    return(
        <>
        <div className={styles.margLeftRowTable }>
            <div className={styles.empty}></div>
            {/* STUDENTS AND EMPLOYEES */}
            <div className={styles.container1}>
            <div className={styles.card}>
        <h1>STUDENTS</h1>
        <h4>{studentData}</h4> 
        </div>
        <div className={styles.card}>
        <h1>EMPLOYEES</h1>
        <h4>{userData}</h4> 
        </div>
            </div>
            {/* INCOME AND EXPENSE */}
            <div className={styles.container1}>
            <div className={styles.card}>
        <h1>INCOME</h1>
        <h4>{incomeData}</h4> 
        </div>
        <div className={styles.card}>
        <h1>EXPENSE</h1>
        <h4>{expense}</h4> 
        </div>
            </div>
 {/* CLASSES AND SECTIONS */}
 <div className={styles.container1}>
            <div className={styles.cardLarge}>
        <h1>CLASSES {classesData.length}</h1>
        {classesData.map(i=>{
           return <div> <h4><u>{ i.title}</u> </h4>
           <h5>Incharges: { i.incharge}</h5></div>
        })} 
        </div>
        <div className={styles.cardLarge}>
        <h1>SECTIONS {sectionData.length}</h1>
        {sectionData.map(i=>{
          return<div> <h4><u>{ i.title}</u> </h4>
                 <h5> Teachers:{ i.teacher}</h5></div>
        })}
        </div>
            </div>
           
        </div>
        
    </>
    )
}

export default Dashboard