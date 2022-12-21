import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import api from "./api/contact";
import AddContact from "./components/AddContact";
import ContactDetails from "./components/ContactDetails";
import ContactList from "./components/ContactList";
import EditContactContainer from "./components/EditContactContainer";
import Header from "./components/Header";

function App(){

   // const LOCAL_STORAGE_KEY = "contacts";
   const [contacts, setContacts] = useState([]);

   const retrieveContacts = async () => {
      const response = await api.get("/contacts");
      return response.data;
   }

   const addContactHandler = async (contact) => {
      const request = {
         id: uuid(),
         ...contact
      }
   
      const response = await api.post("/contacts", request);
      setContacts([...contacts, response.data]);
   };

   const updateContactHandler = async (contact) => {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      const { id } = response.data;
      setContacts(
         contacts.map((contact) => {
          return contact.id === id ? {...response.data} : contact;
         })
      );
   };

   const removeContactHandler = async (id) => {
     
      await api.delete(`/contacts/${id}`);

     const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
     });

     setContacts(newContactList);
   }

   useEffect(() => {
       const getAllContact = async () => {
         const allContact = await retrieveContacts();
         if (allContact) setContacts(allContact);
       }
       getAllContact();
   }, []);

   // useEffect(() => {
   //   //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
   // }, [contacts]);

   return (
      <div className="ui container">
        <Router>
           <Header />
           <Routes>
              <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler}/>}/>
              <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>}/>
              <Route path="/edit" element={<EditContactContainer updateContactHandler={updateContactHandler}/>}/>
              <Route path="/contact/:id" element={<ContactDetails />} />
           </Routes>
        </Router>
      </div>
   );
}

export default App;