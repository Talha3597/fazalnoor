import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom"


import Blank from '../Screens/blank'
import  Sidebar  from '../Screens/privateScreen';
import AddNotice from '../Screens/addNotice'
import Notices from '../Screens/notices'

import ViewNotice from '../Screens/viewNotice'

import ViewHomework from '../Screens/viewHomework'
// homework
import AddHomework from '../Screens/addHomework'
import Homeworks from '../Screens/homeworks'
import UpdateHomework from '../Screens/updateHomework'
//email
import Email from '../Screens/email'
//screen



import RegisterScreen from "../Screens/registerScreen"
import forgotPasswordScreen from "../Screens/forgotPasswordScreen"
import resetPasswordScreen from "../Screens/resetPasswordScreen"
//


//

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
import ViewGradesStudent from '../super_admin/viewGradesStudent'
import UpdateGrade from '../super_admin/updateGrade'

import ViewTitmetable from '../super_admin/viewTimetable'

import UpdateTitmetable from '../super_admin/updateTimetable'
import Profile from '../Screens/profile'
import Exam from '../Screens/exam'

import ViewGradesByClass from '../super_admin/viewGradesByClass'
import ViewGradesBySection from '../super_admin/viewGradesBySection'
import GradeReport from '../super_admin/gradeReport'
import GradeReportByClass from '../super_admin/gradeReportByClass'
import GradeReportBySection from '../super_admin/gradeReportBySection'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
 export const App4=()=> {
   const role=localStorage.getItem('role')
    return (
      
         
      <Router>  
        
     

     
       <Sidebar/>
        
      <Route exect path="/register" component={RegisterScreen}/>
      <Route exect path="/forgotpassword" component={forgotPasswordScreen}/>
      <Route exect path="/passwordreset/:resetToken" component={resetPasswordScreen}/>
      <Route  path="/blank" component={Blank}/>
     
      <Route  path="/profile" component={Profile}/>
      <Route  path="/addNotice" component={AddNotice}/>
      <Route  path="/notices" component={Notices}/>
      <Route  path="/viewNotice/:id" component={ViewNotice}/>
      <Route  path="/viewHomework/:id" component={ViewHomework}/>
      <Route  path="/addHomework" component={AddHomework}/>
      <Route  path="/homeworks" component={Homeworks}/>
      <Route  path="/updateHomework/:id" component={UpdateHomework}/>
      <Route  path="/exam" component={Exam}/>
      <Route exact path="/viewGradesBySection">
            <ViewGradesBySection />
          </Route>
          <Route exact path="/viewGradesByClass">
            <ViewGradesByClass />
          </Route>
      <Route  path="/email" component={Email}/>
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
          <Route exact path="/sectionAttendance/:id">
            <SectionAttendance />
          </Route>
          <Route exact path="/viewAttendance/:title">
            <ViewAttendance />
          </Route>
          <Route exact path="/editAttendance/:title">
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
          <Route exact path="/viewGradesStudent/:id">
            <ViewGradesStudent />
          </Route>
          <Route exact path="/updateGrade/:id">
            <UpdateGrade />
          </Route>
          
          <Route exact path="/viewTimetable">
            <ViewTitmetable />
          </Route>
         
          <Route exact path="/updateTimetable">
            <UpdateTitmetable />
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
           </Router>
          
         );
       }
       

       

const i='true'
export const SidebarData4 = [
  {
    title: 'Dashboard',
    path: '#',
    icon: <FaIcons.FaSchool />
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
       
        
      ]
    
    },
    { status:i,
      title: 'Grades',
      path: '#',
      icon: <FaIcons.FaCalendarTimes />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
       
      subNav: [
        {
          
          title: 'Add Exam',
          path: '/exam',
          icon: <IoIcons.IoMdAddCircleOutline />
        },
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
      title: 'Email',
      path: '/email',
      icon: <IoIcons.IoIosSend />,
    },
    {
      title: 'Reports',
      path: '#',
      icon: <IoIcons.IoIosPaper />,
      iconClosed : <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
  
      subNav: [{
        title: 'Grade Report',
        path: '/gradeReport/:admin_no',
        icon: <IoIcons.IoIosPaper />,
        
      }, {
        title: 'Grade Class',
        path: '/gradeReportByClass/:classTitle/:examTitle',
        icon: <IoIcons.IoIosPaper />,
        
      },{
        title: 'Grade Section',
        path: '/gradeReportBySection/:classTitle/:examTitle/:sectionTitle',
        icon: <IoIcons.IoIosPaper />,
        
      },
      ]},
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
  
