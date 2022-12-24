import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useContact } from "../context/ContactContext";

const ContactList = () => {
   
   const {contacts, retrieveContacts, searchHandler, text, searchResults, loading} = useContact();

   useEffect(() => {
      retrieveContacts();
   },[]);  // eslint-disable-line react-hooks/exhaustive-deps

   const renderContactList = (text.length < 1 ? contacts : searchResults)?.map((contact) => {
      return (
          <ContactCard contact={contact} key={contact.id}/>
      ); 
   });

   const userSearch = (e) => {
      searchHandler(e.target.value);
   }

   return (
      <div className="ui celled list">
         <h2>Contact List
            <Link to="/add">
              <button className="ui button blue right floated">Add Contact</button>
            </Link>
         </h2>
         <div className="ui fluid icon input" style={{marginBottom: "15px"}}>
              <input type="text" placeholder="Search Contacts" className="prompt" value={text} onChange={(e) => userSearch(e)}/>
              <i className="search icon"></i>
         </div>
         {loading ? "Loading" : renderContactList && renderContactList.length > 0 ? renderContactList : "No Contacts available"}
      </div>
   );
}

export default ContactList;