
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom"
import PrivateRoute from "./components/Routing/privateRoute";

import LoginScreen from "./components/Screens/loginScreen"
import ForgotPasswordScreen from "./components/Screens/forgotPasswordScreen"
import ResetPasswordScreen from "./components/Screens/resetPasswordScreen"
import HomeScreen from "./frontend/homepage"
import NoticeBoard from "./frontend/noticeBoard"

//


import  {App1}  from './components/Routing/superAdminRoute';
const App=()=> {
  
 

  return (
    
       
     
    <Router>
        <PrivateRoute  component={App1}/>
        <Route exect path="/home" component={HomeScreen}/>
        <Route exect path="/noticeB" component={NoticeBoard}/>
        <Route exect path="/login" component={LoginScreen}/>
        <Route exect path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exect path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>
        
    </Router>
   
  );
}

export default App;
