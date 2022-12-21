import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {

   const deleteContactHabdler = (id) =>{
      props.getContactId(id);
   };

   const renderContactList = props.contacts.map((contact) => {
      return (
          <ContactCard contact={contact} clickHandler={deleteContactHabdler} key={contact.id}/>
      ); 
   })

   return (
      <div className="ui celled list">
         <h2>Contact List
            <Link to="/add">
              <button className="ui button blue right floated">Add Contact</button>
            </Link>
         </h2>
         {/* <div className="ui fluid icon input" style={{marginBottom: "15px"}}>
              <input type="text" placeholder="Search Contacts" className="prompt" />
              <i className="search icon"></i>
         </div> */}
         {renderContactList}
      </div>
   );
}

export default ContactList;