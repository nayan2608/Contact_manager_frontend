import { useLocation } from "react-router-dom";
import EditContact from "./EditContact";

const EditContactContainer = (props) => {

    const location = useLocation().state; 
    
     return (
        <EditContact {...props} location={location}/>
     );
}

export default EditContactContainer;