import styles from '../../assets/style.module.css'
//import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import axios from 'axios'

import {Link} from 'react-router-dom'


import styled from 'styled-components';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import  {SidebarData1}  from '../Routing/adminRoute';
import {SidebarData2}  from '../Routing/superAdminRoute';
import  {SidebarData3}  from '../Routing/financeRoute';
import  {SidebarData4}  from '../Routing/teacherRoute';
import {SidebarData6}  from '../Routing/adminFinance';
import  {SidebarData7}  from '../Routing/adminTeacher';
import  {SidebarData8}  from '../Routing/financeTeacher';

//import SidebarData4  from '../Routing/teacherRoute';
import SubMenu from './submenu';
import { IconContext } from 'react-icons/lib';



const Nav = styled.div`
  background:#15171c;       // 
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  
  justify-content: flex-start;
  align-items: center;
`;


const SidebarNav = styled.nav`
  background: #15171c;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  overflow-y: scroll;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const PrivateScreen = ({history}) =>{
    const [sidebar, setSidebar] = useState(true);
    
    const role=localStorage.getItem("role")
    const username=localStorage.getItem("username")
  const showSidebar = () => setSidebar(!sidebar);
 const [error, setError]= useState('')
 const [privateData, setPrivateData]= useState("")



 
 useEffect(()=>{
    if(!localStorage.getItem("authToken") && !localStorage.getItem("role"))
    {   window.location='/login'
        history.push("/login")
    }
    
    const config= {
        header:{
            "Content-Type":"application/json",
            Authorization:`Bearer${localStorage.getItem("authToken")}`,
            role:localStorage.getItem("role")
        }
   }
    const fetchPrivateData=async()=>
    {
       
       try {
        const {data}= await (await axios.get('http://localhost:5000/api/private',config))
        setPrivateData(data.data)
             
        } catch (error) {
            localStorage.removeItem("authToken")
             setError("You are not authorized please login")
        }
    }
    
    fetchPrivateData()
    
     
 },[history])
   const logoutHandler=()=>{
       localStorage.removeItem("authToken")
       localStorage.removeItem("role")
       localStorage.removeItem("username")
       window.location='/login'}
 return error ?  (
    <span className="error-message">{error}</span>):
     (
         <>
         <div style={{backgorund:"green", color:"weight"}}>
             {privateData}
         </div>
        
        
         <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
         <div className={styles.heading}>
            Fazal Noor School System</div>
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
          &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; 
         
          <NavIcon  to='#' style={{align:'text-right'}}>
            <FaIcons.FaSignOutAlt onClick={logoutHandler} />
          </NavIcon> 
         
          
          
        </Nav>
       
        <SidebarNav sidebar={sidebar}  >
       
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <h4 className={styles.heading}>  {username}</h4>
            { role=="admin" ?
           SidebarData1.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          }): role=="superAdmin" ?
          SidebarData2.map((item, index) => {
           return <SubMenu item={item} key={index} />;
         }): role=="finance" ?
         SidebarData3.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        }): role=="adminFinance" ?
        SidebarData6.map((item, index) => {
         return <SubMenu item={item} key={index} />;
       }): role=="adminTeacher" ?
       SidebarData7.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      }): role=="financeTeacher" ?
      SidebarData8.map((item, index) => {
       return <SubMenu item={item} key={index} />;
     }): SidebarData4.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        }) } 
           
          </SidebarWrap>
         
        </SidebarNav>
       
      </IconContext.Provider>
     
         </>
         
     )
    
}
export default PrivateScreen
