import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
const i='true'
export const SidebarData = [
  { status:i,
    title: 'Student',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      
      {
        status:i,
        title: 'Students',
        path: '/students',
        icon: <IoIcons.IoIosPaper />
      
      },{
        status:'true',
        title: 'Add Student',
        path: '/addStudent',
        icon: <IoIcons.IoIosPaper />
      },
      
    ]
  
  },
  { status:i,
    title: 'Academic',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      
      {
        status:i,
        title: 'Academic Section',
        path: '/classData',
        icon: <IoIcons.IoIosPaper />
      
      },
      {
        status:i,
        title: 'Add Class',
        path: '/addClass',
        icon: <IoIcons.IoIosPaper />
      
      },
    ]
  
  },
 
  { status:i,
    title: 'Home Work',
    path: '#',
    icon: <AiIcons.AiFillHome />,
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
        icon: <IoIcons.IoIosPaper />
      },
      
    ]
  
  },
  { status:i,
    title: 'Team',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      {
        status:'true',
        title: 'Users',
        path: '/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Register',
        path: '/register',
        icon: <IoIcons.IoIosPaper />
      },
      
    ]
  
  },
  
  { status:i,
    title: 'Notice Board',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      {
        status:'true',
        title: 'Notices',
        path: '/notices',
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Add Notice',
        path: '/addNotice',
        icon: <IoIcons.IoIosPaper />
      },
      
    ]
  
  },
  { status:i,
    title: 'Income',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      {
        status:'true',
        title: 'Incomes',
        path: '/income',
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Add Income',
        path: '/addIncome',
        icon: <IoIcons.IoIosPaper />
      },
      
    ]
  
  },
  { status:i,
    title: 'Expense',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      {
        status:'true',
        title: 'Expenses',
        path: '/expense',
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Add Expense',
        path: '/addExpense',
        icon: <IoIcons.IoIosPaper />
      },
      
    ]
  
  },
 
  { status:i,
    title: 'Fee',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      {
        status:'true',
        title: 'Fees',
        path: '/fees',
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Add Fee',
        path: '/addFee',
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Pay Fee',
        path: '/payFee',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  
  },
  { status:i,
    title: 'Salary',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
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
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Pay Salary',
        path: '/paySalary',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  
  },
 
  { status:i,
    title: 'Timetable',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
     
    subNav: [
      {
        status:'true',
        title: 'View Timetable',
        path: '/viewTimetable',
        icon: <IoIcons.IoIosPaper />
      },
      {
        status:'true',
        title: 'Manage Timetable',
        path: '/manageTimetable',
        icon: <IoIcons.IoIosPaper />
      },
      
    ]
  
  },
  {
    title: 'Grades',
    path: '/viewGrades',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Transfer',
    path: '/transfer',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Promote',
    path: '/promoteClass',
    icon: <IoIcons.IoMdPeople />
  },
  
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    iconClosed : <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Reports',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 2',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  
];
