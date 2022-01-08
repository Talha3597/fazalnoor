import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Blank from '../Screens/blank'
import AddStudent from '../Screens/addStudent'
import Students from '../Screens/students'
import UpdateStudent from '../Screens/updateStudent'
import ViewStudent from '../Screens/viewStudent'
import  Sidebar  from '../Screens/privateScreen';
import AddNotice from '../Screens/addNotice'
import Notices from '../Screens/notices'
import UpdateNotice from '../Screens/updateNotice'
import ViewNotice from '../Screens/viewNotice'
//email
import Email from '../Screens/email'
import Message from '../Screens/messages'
//screen



import RegisterScreen from "../Screens/registerScreen"
import forgotPasswordScreen from "../Screens/forgotPasswordScreen"
import resetPasswordScreen from "../Screens/resetPasswordScreen"
//
import ExpenseDashboard from "../Screens/expenseDashboard"
import Expense from "../Screens/expense"
import AddExpense from "../Screens/addExpense"
//
import IncomeDashboard from "../Screens/incomeDashboard"
import Income from "../Screens/income"
import AddIncome from "../Screens/addIncome"
//
import FeeDashboard from "../Screens/feeDashboard"
import Fee from "../Screens/fees"
import AddFee from "../Screens/addFee"
import PayFee from "../Screens/payFee"
import AddFeeStudent from "../Screens/addFeeStudent"
//
import SalaryDashboard from "../Screens/salaryDashboard"
import Salary from "../Screens/salaries"
import PaySalary from "../Screens/paySalary"
import ViewIncome from "../Screens/incomeView"
import ViewExpense from "../Screens/expenseView"
//User

import Users from '../Screens/users'
import ViewUser from '../Screens/viewUser'
import Profile from '../Screens/profile'
//report
import ReportFinance from '../Screens/reportFinance'
import ReportFinanceRole from '../Screens/reportFinanceRole'
import ReportClassFee from '../Screens/reportClassFee'
import MessageList from '../Screens/messageList'
import FeeReport from '../Screens/feeReport'

//



import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
const i='true'

export const App3=()=> {
  return (
    <Router>
        
        
<Sidebar/>
      
<Route  path="/addStudent" component={AddStudent}/>
        <Route  path="/students" component={Students}/>
        <Route  path="/updateStudent/:id" component={UpdateStudent}/>
        <Route  path="/viewStudent/:id" component={ViewStudent}/>
        
      <Route exect path="/register" component={RegisterScreen}/>
      <Route exect path="/forgotpassword" component={forgotPasswordScreen}/>
      <Route exect path="/passwordreset/:resetToken" component={resetPasswordScreen}/>
      <Route  path="/blank" component={Blank}/>
     
      
      <Route  path="/addNotice" component={AddNotice}/>
      <Route  path="/notices" component={Notices}/>
      <Route  path="/updateNotice/:id" component={UpdateNotice}/>
      <Route  path="/viewNotice/:id" component={ViewNotice}/>
      
      
      <Route  path="/email" component={Email}/>
      <Route  path="/messages" component={Message}/>
      
      <Route  path="/expense" component={Expense}/>
      <Route  path="/addExpense" component={AddExpense}/>
     
      <Route  path="/income" component={Income}/>
      
      <Route  path="/addIncome" component={AddIncome}/>
      
      <Route  path="/fees" component={Fee}/>
      <Route  path="/feeDashboard" component={FeeDashboard}/>
      <Route  path="/salaryDashboard" component={SalaryDashboard}/>
      <Route  path="/incomeDashboard" component={IncomeDashboard}/>
      <Route  path="/expenseDashboard" component={ExpenseDashboard}/>
<Route  path="/addFeeStudent/:id" component={AddFeeStudent}/>
      <Route  path="/addFee" component={AddFee}/>
      <Route  path="/payFee/:id" component={PayFee}/>
        <Route  path="/salaries" component={Salary}/>
     
      <Route  path="/paySalary/:id" component={PaySalary}/>
       
    <Route  path="/users" component={Users}/>
   
    <Route  path="/profile" component={Profile}/>
    <Route  path="/viewUser/:id" component={ViewUser}/>
    <Route  path="/reportFinance" component={ReportFinance}/>
    <Route  path="/reportClassFee" component={ReportClassFee}/>
    <Route  path="/reportFinanceRole" component={ReportFinanceRole}/>
    <Route  path="/feeReport" component={FeeReport}/>
    <Route  path="/messageList" component={MessageList}/>
 
<Route  path="/incomeView/:id" component={ViewIncome}/>
<Route  path="/expenseView/:id" component={ViewExpense}/>           
     
         </Router>
       
       );
     }
     
   
     

  export const SidebarData3 = [
    {
      title: 'Dashboard',
      path: '#',
      icon: <FaIcons.FaSchool />
    },
      { 
        title: 'Students',
        path: '/students',
        icon: <IoIcons.IoMdSchool/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
         
        
      },
      { status:i,
        title: 'Team',
        path: '/users',
        icon: <IoIcons.IoMdPeople />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
       
      },
     
      
      { status:i,
        title: 'Notice',
        path: '#',
        icon: <FaIcons.FaAtlas />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
         
        subNav: [
          {
            
            title: 'Notices',
            path: '/notices',
            icon: <IoIcons.IoMdNotificationsOutline />
          },
          {
           
            title: 'Add Notice',
            path: '/addNotice',
            icon: <AiIcons.AiOutlineAppstoreAdd />
          },
          
        ]
      
      },
      { 
        title: 'Income',
        path: '#',
        icon: <IoIcons.IoIosExit />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
         
        subNav: [
          {
            title: 'Dashboard',
            path: '/incomeDashboard',
            icon: <AiIcons.AiOutlineDashboard />
          },
          {
            
            title: 'Incomes',
            path: '/income',
            icon: <FaIcons.FaMoneyBill/>
          },
          {
            status:'true',
            title: 'Add Income',
            path: '/addIncome',
            icon: <IoIcons.IoMdAddCircleOutline />
          },
          
        ]
      
      },
      { status:i,
        title: 'Expense',
        path: '#',
        icon: <IoIcons.IoIosExit />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
         
        subNav: [
          {
            title: 'Dashboard',
            path: '/expenseDashboard',
            icon: <AiIcons.AiOutlineDashboard />
          },
          {
            status:'true',
            title: 'Expenses',
            path: '/expense',
            icon: <FaIcons.FaMoneyBill />
          },
          {
            status:'true',
            title: 'Add Expense',
            path: '/addExpense',
            icon: <IoIcons.IoMdAddCircleOutline />
          },
          
        ]
      
      },
      { 
        title: 'Fee',
        path: '#',
        icon: <RiIcons.RiCurrencyLine/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
         
        subNav: [
          {
            title: 'Dashboard',
            path: '/feeDashboard',
            icon: <AiIcons.AiOutlineDashboard />
          },
          {
            status:'true',
            title: 'Fees',
            path: '/fees',
            icon: <FaIcons.FaMoneyBill />
          },
          {
            status:'true',
            title: 'Add Fee',
            path: '/addFee',
            icon: <IoIcons.IoMdAddCircleOutline />
          },
         
        ]
      
      },
      { status:i,
        title: 'Salary',
        path: '#',
        icon:  <RiIcons.RiCurrencyLine/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
         
        subNav: [
          {
            title: 'Dashboard',
            path: '/salaryDashboard',
            icon: <AiIcons.AiOutlineDashboard />
          },
          {
            status:'true',
            title: 'Salaries',
            path: '/salaries',
            icon: <IoIcons.IoIosPaper />
          },
         
        ]
      
      },
      
      {
        title: 'Email',
        path: '/email',
        icon: <IoIcons.IoIosSend />,
      },
     
      {
        title: 'Messages',
        path: '#',
        icon: <FaIcons.FaEnvelopeOpenText />,
    
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    
        subNav: [
          {
            title: 'Message ',
            path: '/messageList',
            icon: <IoIcons.IoIosPaper />
          },
          {
            title: 'Compose Message',
            path: '/messages',
            icon: <IoIcons.IoIosPaper />
          }
        ]
      },
      
      {
        title: 'Profile',
        path: '#',
        icon: <IoIcons.IoMdPerson/>,
    
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    
        subNav: [
          {
            title: 'Info ',
            path: '/profile',
            icon: <IoIcons.IoIosPaper />
          },
          {
            title: 'Reset Password',
            path: '/passwordreset:resetToken',
            icon: <IoIcons.IoIosPaper />
          }
        ]
      },
      
      
    ];
    
  