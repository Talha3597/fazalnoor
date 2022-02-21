import styles from '../../assets/style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react'
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
  margin-left: 0.5rem;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const NavIconLogout = styled(Link)`
  margin-left:95%;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    margin-left:75%;
  }
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
 
 
 
 
 useEffect(()=>{
    if(!localStorage.getItem("authToken") && !localStorage.getItem("role"))
    {  
        window.location="/login"
    }
    
    const config= {
        headers:{
            
            Authorization:`Bearer ${localStorage.getItem("authToken")}`,
            role:localStorage.getItem("role")
        }
   }
    const fetchPrivateData=async()=>
    {
       
       try {
        const {data}=  (await axios.get('/api/private',config))
        console.log(data.data)

             
        } catch (error) {
            localStorage.removeItem("authToken")
            localStorage.removeItem("role")
            window.location="/login"
        }
    }
    
    fetchPrivateData()
    
     
 },[history])
   const LogoutHandler=()=>{
       localStorage.removeItem("authToken")
       localStorage.removeItem("role")
       localStorage.removeItem("username")
       setSidebar(false)
       document.location.href = '/login'
       }
 return ( <>
         
        
         <IconContext.Provider value={{ color: '#fff' }}>
        <Nav >
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar}  />
          </NavIcon>
          <NavIconLogout   to='#' >
            <FaIcons.FaSignOutAlt onClick={LogoutHandler} />
          </NavIconLogout> 
         
          
          
        </Nav>
       
        <SidebarNav sidebar={sidebar}   >
      
          <SidebarWrap  >
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose  onClick={showSidebar} />
            </NavIcon>
            <h4 className={styles.heading}>  {username}</h4>
            { role=="admin" ?
           SidebarData1.map((item, index) => {
            return <SubMenu  item={item} key={index} />;
          }): role=="superAdmin" ?
          SidebarData2.map((item, index) => {
           return <SubMenu  item={item} key={index} />;
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
     }): role=="teacher" ? SidebarData4.map((item, index) => {
          return <SubMenu  item={item} key={index} />;
        }) :''} 
           
          </SidebarWrap>
         
        </SidebarNav>
       
      </IconContext.Provider>
     
         </>
         
 )
    
}
export default PrivateScreen
