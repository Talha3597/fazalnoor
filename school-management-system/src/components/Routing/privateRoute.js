import{Redirect,Route,useHistory} from 'react-router-dom'
const privateRoute=({component:Component, ...rest})=>{
    return(
        <Route 
         {...rest} 
          render ={(props)=> 
          localStorage.getItem("authToken") ?
          (<Component {...props}/>):
          (<Redirect to='/home'/>) 
         } 
        
        />
        
    )
}
export default privateRoute