import{Route,Link} from 'react-router-dom'
const privateRoute=({component:Component, ...rest})=>{
    return(
        <Route 
         {...rest} 
          render ={(props)=> 
          localStorage.getItem("authToken") ?
          (<Component {...props}/>):
          (<Link to='/login'/>) 
         } 
        
        />
        
    )
}
export default privateRoute