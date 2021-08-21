import React, {  useState} from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';




function Upload(){
   
     
     const [photo, setPhoto]=useState("")
     const onSubmit = async() => {
         
         axios.post('http://localhost:5000/api/uploads',{photo})
           

}
return(
    <form method="post" onSubmit={onSubmit} encType="multipart/form-data">
                                
    <label>Attachment:</label>
    <div className="form-group">
        <input type="file" name="photo" value={photo} onChange={e=>setPhoto(e.target.value)}/>
    </div>
    <button  type="submit">
                                        
    Submit
    </button>
    </form>
)
  }
  export default Upload