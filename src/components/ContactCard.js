import user from '../images/user.jpg';
import { Link } from "react-router-dom";
import { useContact } from '../context/ContactContext';

const ContactCard = (props) => {
 
    const {removeContactHandler} = useContact();
    const { id, name, email} = props.contact;

    const deleteContact = (id) => {
       removeContactHandler(id);
    }

    return (
        <div className="item">
              <img className='ui avatar image' src={user} alt="user" />
              <div className="content">
                  <Link to={`/contact/${id}`} state={props.contact}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                  </Link>
              </div>
              <i className="trash alternate outline icon right floated" 
                 style={{color:"red", marginTop: "7px", marginLeft: "10px"}}
                 onClick={() => deleteContact(id)}
               ></i>
              <Link to={`/edit`} state={props.contact}>
                <i className="edit alternate outline icon right floated" 
                  style={{color:"blue", marginTop: "7px"}}
                ></i>
              </Link>
        </div>
    );
}

export default ContactCard;