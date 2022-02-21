import{Redirect,Route,} from 'react-router-dom'
const privateRoute=({component:Component, ...rest})=>{
    return(
        <Route 
         {...rest} 
          render ={(props)=> 
          localStorage.getItem("authToken") &&  localStorage.getItem("role") ?
          (<Component {...props}/>):
          (<Redirect to='/home'/>) 
         } 
        
        />
        
    )
}
export default privateRoute