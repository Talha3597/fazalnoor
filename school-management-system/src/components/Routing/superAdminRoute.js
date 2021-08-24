import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom"
import styles from '../../assets/style.module.css'
import PrivateRoute from "./privateRoute";
import  {App2}  from './adminRoute';
import  {App4}  from './teacherRoute';
import  {App5}  from './ranRoute';
import  {App3}  from './financeRoute';
import  {App6}  from './adminFinance';
import  {App7}  from './adminTeacher';
import  {App8}  from './financeTeacher';

import AddStudent from '../Screens/addStudent'
import Students from '../Screens/students'
import UpdateStudent from '../Screens/updateStudent'
import ViewStudent from '../Screens/viewStudent'
import  Sidebar  from '../Screens/privateScreen';
import AddNotice from '../Screens/addNotice'
import Notices from '../Screens/notices'
import UpdateNotice from '../Screens/updateNotice'
import ViewNotice from '../Screens/viewNotice'

import ViewHomework from '../Screens/viewHomework'
// homework
import AddHomework from '../Screens/addHomework'
import Homeworks from '../Screens/homeworks'
import UpdateHomework from '../Screens/updateHomework'
import PromoteClass from '../Screens/promoteClass'
//email
import Email from '../Screens/email'
import Message from '../Screens/messages'
import Upload from '../Screens/upload'
import Transfer from '../Screens/transfer'
//screen



import RegisterScreen from "../Screens/registerScreen"
import forgotPasswordScreen from "../Screens/forgotPasswordScreen"
import resetPasswordScreen from "../Screens/resetPasswordScreen"
//
import IncomeCategories from "../Screens/incomeCategories"
import ExpenseDashboard from "../Screens/expenseDashboard"
import Expense from "../Screens/expense"
import AddExpense from "../Screens/addExpense"
import UpdateExpense from "../Screens/updateExpense"
//
import IncomeDashboard from "../Screens/incomeDashboard"
import Income from "../Screens/income"
import AddIncome from "../Screens/addIncome"
import UpdateIncome from "../Screens/updateIncome"
import ViewIncome from "../Screens/incomeView"
import ViewExpense from "../Screens/expenseView"


//
import FeeDashboard from "../Screens/feeDashboard"
import Fee from "../Screens/fees"
import AddFee from "../Screens/addFee"
import PayFee from "../Screens/payFee"
//
import SalaryDashboard from "../Screens/salaryDashboard"
import Salary from "../Screens/salaries"
import AddSalary from "../Screens/addSalary"
import PaySalary from "../Screens/paySalary"

//User

import Users from '../Screens/users'
import UpdateUser from '../Screens/updateUser'
import ViewUser from '../Screens/viewUser'
import Profile from '../Screens/profile'
//report
import AccountLedger from '../Screens/accountLedger'
import FeeReport from '../Screens/feeReport'
import ReportFinance from '../Screens/reportFinance'
import ReportFinanceRole from '../Screens/reportFinanceRole'
import ReportClassFee from '../Screens/reportClassFee'
import ReportRoleSalary from '../Screens/reportRoleSalary'
import MessageList from '../Screens/messageList'


//
import SuperAdminDashboard from '../super_admin/addClass'
//import AddStudent from './components/super_admin/addStudent'
import AddSection from '../super_admin/addSection'
import ClassData from '../super_admin/classData'
import SectionData from '../super_admin/sectionData'
import UpdateSection from '../super_admin/updateSection'
import Attendance from '../super_admin/attendance'
import SectionAttendance from '../super_admin/sectionAttendance'
import ViewAttendance from '../super_admin/viewAttendance'
import EditAttendance from '../super_admin/editAttendance'
import ViewStudents from '../super_admin/viewStudents'
import ManageGrades from '../super_admin/manageGrades'
import ViewGrades from '../super_admin/viewGrades'
// import ViewGradesByClass from '../super_admin/viewGradesByClass'
// import ViewGradesBySection from '../super_admin/viewGradesBySection'
// import GradeReport from '../super_admin/gradeReport'
// import GradeReportByClass from '../super_admin/gradeReportByClass'
// import GradeReportBySection from '../super_admin/gradeReportBySection'
import ViewGradesByClass from '../super_admin/viewGradesByClass'
import ViewGradesBySection from '../super_admin/viewGradesBySection'
import GradeReport from '../super_admin/gradeReport'
import GradeReportByClass from '../super_admin/gradeReportByClass'
import GradeReportBySection from '../super_admin/gradeReportBySection'
import UpdateGrade from '../super_admin/updateGrade'
import ManageTitmetable from '../super_admin/manageTimetable'
import ViewTitmetable from '../super_admin/viewTimetable'
import EditTitmetable from '../super_admin/editTimetable'
import UpdateTitmetable from '../super_admin/updateTimetable'
import UpdateClass from '../super_admin/updateClass'
import ManageClassData from '../super_admin/manageClassData'
// import SuperadminDashboard from '../super_admin/SD_Dashboard'// 
// import SuperadminDashboard from '../super_admin/addClass'

import LoginScreen from "../Screens/loginScreen"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
 export const App1=()=> {
   const role=localStorage.getItem('role')
    return (
      
         
      <Router>  
        
     {role==="admin"?<Route  component={App2}/>:role==="finance"?<Route component={App3}/>:role==="teacher"?<Route component={App4}/>:role==="adminFinance"?<Route  component={App6}/>:role==="adminTeacher"?<Route  component={App7}/>:
     role==="financeTeacher"?<Route  component={App8}/>:role==="superAdmin"?

     <Route>
       
       <Sidebar/>
       

        <Route  path="/addStudent" component={AddStudent}/>
        <Route  path="/students" component={Students}/>
        <Route  path="/updateStudent/:id" component={UpdateStudent}/>
        <Route  path="/viewStudent/:id" component={ViewStudent}/>
        
      <Route exect path="/register" component={RegisterScreen}/>
      <Route exect path="/forgotpassword" component={forgotPasswordScreen}/>
      <Route exect path="/passwordreset/:resetToken" component={resetPasswordScreen}/>
     
      
      <Route  path="/addNotice" component={AddNotice}/>
      <Route  path="/notices" component={Notices}/>
      <Route  path="/updateNotice/:id" component={UpdateNotice}/>
      <Route  path="/viewNotice/:id" component={ViewNotice}/>
      <Route  path="/viewHomework/:id" component={ViewHomework}/>
      <Route  path="/addHomework" component={AddHomework}/>
      <Route  path="/homeworks" component={Homeworks}/>
      <Route  path="/updateHomework/:id" component={UpdateHomework}/>
      
      
      <Route  path="/promoteClass" component={PromoteClass}/>
      <Route  path="/email" component={Email}/>
      <Route  path="/messages" component={Message}/>
      <Route  path="/upload" component={Upload}/>
      <Route  path="/transfer" component={Transfer}/>
      <Route  path="/expense" component={Expense}/>
      <Route  path="/addExpense" component={AddExpense}/>
      <Route  path="/updateExpense/:id" component={UpdateExpense}/>
      <Route  path="/income" component={Income}/>
      <Route  path="/incomeCategories" component={IncomeCategories}/>
      <Route  path="/addIncome" component={AddIncome}/>
      <Route  path="/updateIncome/:id" component={UpdateIncome}/>
      <Route  path="/incomeView/:id" component={ViewIncome}/>
      <Route  path="/expenseView/:id" component={ViewExpense}/>

      <Route  path="/fees" component={Fee}/>
      <Route  path="/feeDashboard" component={FeeDashboard}/>
      <Route  path="/salaryDashboard" component={SalaryDashboard}/>
      <Route  path="/incomeDashboard" component={IncomeDashboard}/>
      <Route  path="/expenseDashboard" component={ExpenseDashboard}/>
     
      <Route  path="/addFee" component={AddFee}/>
      <Route  path="/payFee/:id" component={PayFee}/>
        <Route  path="/salaries" component={Salary}/>
      <Route  path="/addSalary" component={AddSalary}/>
      <Route  path="/paySalary/:id" component={PaySalary}/>
       
    <Route  path="/users" component={Users}/>
    <Route  path="/updateUser/:id" component={UpdateUser}/>
    <Route  path="/profile" component={Profile}/>
    <Route  path="/viewUser/:id" component={ViewUser}/>
    <Route  path="/accountLedger" component={AccountLedger}/>
    <Route  path="/reportFinance" component={ReportFinance}/>
    <Route  path="/reportClassFee" component={ReportClassFee}/>
    <Route  path="/reportRoleSalary" component={ReportRoleSalary}/>
    <Route  path="/feeReport" component={FeeReport}/>
    <Route  path="/reportFinanceRole" component={ReportFinanceRole}/>
    <Route  path="/messageList" component={MessageList}/>
    
      <Route exact path="/addClass">
            <SuperAdminDashboard />
          </Route>
          
          {/* <Route exact path="/">
            <SuperAdminDashboard />
          </Route> */}
          {/* <Route exact path="/addStudent">
            <AddStudent />
          </Route> */}
          <Route exact path="/addSection/:id">
            <AddSection />
          </Route>
          <Route exact path="/classData">
            <ClassData />
          </Route>
          <Route exact path="/sectionData/:id">
            <SectionData />
          </Route>
          <Route exact path="/updateSection/:id_1/:id_2">
            <UpdateSection />
          </Route>
          <Route exact path="/attendance">
            <Attendance />
          </Route>
          <Route exact path="/sectionAttendance/:id_s/:id_c">
            <SectionAttendance />
          </Route>
          <Route exact path="/viewAttendance/:title_s/:title_c">
            <ViewAttendance />
          </Route>
          <Route exact path="/editAttendance/:title_s/:title_c">
            <EditAttendance />
          </Route>
          <Route exact path="/viewStudents/:title">
            <ViewStudents />
          </Route>
          <Route exact path="/manageGrades/:id">
            <ManageGrades />
          </Route>
          <Route exact path="/viewGrades">
            <ViewGrades />
          </Route>
          <Route exact path="/viewGradesBySection">
            <ViewGradesBySection />
          </Route>
          <Route exact path="/viewGradesByClass">
            <ViewGradesByClass />
          </Route>
          <Route exact path="/gradeReport/:admin_no">
            <GradeReport />
          </Route>
          <Route exact path="/gradeReportByClass/:classTitle/:examTitle">
            <GradeReportByClass />
          </Route>
          <Route exact path="/gradeReportBySection/:classTitle/:examTitle/:sectionTitle">
            <GradeReportBySection />
          </Route>
          <Route exact path="/updateGrade/:id">
            <UpdateGrade />
          </Route>
          <Route exact path="/manageTimetable">
            <ManageTitmetable />
          </Route>
          <Route exact path="/viewTimetable">
            <ViewTitmetable />
          </Route>
          <Route exact path="/editTimetable">
            <EditTitmetable />
          </Route>
          <Route exact path="/updateTimetable/:id">
            <UpdateTitmetable />
          </Route>
          <Route exact path="/manageClassData">
            <ManageClassData />
          </Route>
          <Route exact path="/updateClass/:id_1">
            <UpdateClass />
          </Route>
          {/* <Route exact path="/superadminDashboard">
            <SuperadminDashboard />
          </Route> */}
           </Route> :<App5/>}
           </Router>
          
         );
       }
       

       
const i='true'
export const SidebarData2 = 
[
 
    { 
      title: 'Student',
      path: '#',
      icon: <IoIcons.IoMdSchool/>,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
       
      subNav: [
        
        {
          
          title: 'Students',
          path: '/students',
          icon: <IoIcons.IoIosPeople />
        
        },{
          status:'true',
          title: 'Add Student',
          path: '/addStudent',
          icon: <AiIcons.AiOutlineUserAdd />
        },
        
      ]
    
    },
    { status:i,
      title: 'Team',
      path: '#',
      icon: <IoIcons.IoMdPeople />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
       
      subNav: [
        {
          
          title: 'Users',
          path: '/users',
          icon: <IoIcons.IoIosPeople />
        },
        {
          status:'true',
          title: 'Register',
          path: '/register',
          icon: <AiIcons.AiOutlineUserAdd />
        },
        
      ]
    
    },
   
    { 
      title: 'Academic',
      path: '#',
      icon:  <IoIcons.IoIosPaper />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
       
      subNav: [
        {
          title: 'Dashboard',
          path: '#',
          icon: <AiIcons.AiOutlineDashboard />
        },
        {
         
          title: 'Academic Section',
          path: '/classData',
          icon: <IoIcons.IoMdBook />
        
        },
        {
         
          title: 'Add Class',
          path: '/addClass',
          icon: <AiIcons.AiOutlineAppstoreAdd />
        
        }, {
         
          title: 'Manage Classes',
          path: '/manageClassData',
          icon: <AiIcons.AiOutlineAppstoreAdd />
        
        },
      ]
    
    },
   
    { 
      title: 'Work',
      path: '#',
      icon: <IoIcons.IoIosPaper />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
       
      subNav: [
        {
          status:'true',
          title: 'Homeworks',
          path: '/homeworks',
          icon: <IoIcons.IoIosPaper />
        },
        {
          status:'true',
          title: 'Add Homework',
          path: '/addHomework',
          icon: <AiIcons.AiOutlineAppstoreAdd />
        },
        
      ]
    
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
        {
          status:'true',
          title: 'Add salary',
          path: '/addSalary',
          icon: <IoIcons.IoMdAddCircleOutline />
        },
       
      ]
    
    },
   
   
   
    { status:i,
      title: 'Timetable',
      path: '#',
      icon: <FaIcons.FaCalendarTimes />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
       
      subNav: [
        {
          
          title: 'View Timetable',
          path: '/viewTimetable',
          icon: <IoIcons.IoIosPaper />
        },
        {
          
          title: 'Manage Timetable',
          path: '/manageTimetable',
          icon: <AiIcons.AiOutlineAppstoreAdd />
        },
        {
          
          title: 'Edit Timetable',
          path: '/editTimetable',
          icon: <AiIcons.AiOutlineAppstoreAdd />
        },
       
        
      ]
    
    },
    { status:i,
      title: 'Grades',
      path: '#',
      icon: <IoIcons.IoIosPaper />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
       
      subNav: [
        {
          
          title: 'View Grades',
          path: '/viewGrades',
          icon: <IoIcons.IoIosPaper />
        },
        {
          
          title: 'Section Grades',
          path: '/viewGradesBySection',
          icon: <AiIcons.AiOutlineAppstoreAdd />
        },
        {
          
          title: 'Class Grades',
          path: '/viewGradesByClass',
          icon: <AiIcons.AiOutlineAppstoreAdd />
        },
       
        
      ]
    
    },
   {
      title: 'Attendance',
      path: '/attendance',
      icon: <IoIcons.IoIosPerson />
    },
    {
      title: 'Transfer',
      path: '/transfer',
      icon: <FaIcons.FaConnectdevelop/>
    },
    {
      title: 'Promote',
      path: '/promoteClass',
      icon: <RiIcons.RiFolderTransferLine />
    },
    
    {
      title: 'Reports',
      path: '#',
      icon: <IoIcons.IoIosPaper />,
      iconClosed : <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
  
      subNav: [
        {
          title: 'Account Ledger',
          path: '/accountLedger',
          icon: <IoIcons.IoIosPaper />,
          
        },
        {
          title: 'Finance Report',
          path: '/reportFinance',
          icon: <IoIcons.IoIosPaper />,
          
        },
        {
          title: 'Fee Report',
          path: '/feeReport',
          icon: <IoIcons.IoIosPaper />,
          
        },
        {
          title: ' Cashier Report',
          path: '/reportFinanceRole',
          icon: <IoIcons.IoIosPaper />,
          
        },
        {
          title: 'Class Fee',
          path: '/reportClassFee',
          icon: <IoIcons.IoIosPaper />,
          
        }, {
          title: 'Salary Report',
          path: '/reportRoleSalary',
          icon: <IoIcons.IoIosPaper />,
          
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
  
