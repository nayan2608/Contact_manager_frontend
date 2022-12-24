import { createContext, useContext, useState } from "react";
import api from "../api/contact";
import { v4 as uuid } from "uuid";

const contactContext = createContext();

export function ContactContextProvider ({children}) {

     const [contacts, setContacts] = useState(); 
     const [text, setText] = useState("");
     const [searchResults, setSearchResults] = useState([]);
     const [loading, setLoading] = useState(false);

     // retrievecontact
     const retrieveContacts = async () => {
        setLoading(true);
        const response = await api.get("/contacts");
        if (response.data) {
            setContacts(response.data);
        }
        setLoading(false);
     }

     // removecontact
     const removeContactHandler = async (id) => {
       await api.delete(`/contacts/${id}`);
       const newContactList = contacts.filter((contact) => {
          return contact.id !== id;
       });
  
       setContacts(newContactList);
     }

     // addcontact
     const addContactHandler = async (contact) => {
        const request = {
           id: uuid(),
           ...contact
        }
     
        const response = await api.post("/contacts", request);
        setContacts([...contacts, response.data]);
     };

     // updatecontact
     const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const { id } = response.data;
        setContacts(
           contacts.map((contact) => {
            return contact.id === id ? {...response.data} : contact;
           })
        );
     };

     // searchcontact
     const searchHandler = (searchTerm) => {
         setText(searchTerm);
         if (searchTerm !== "") {
            const newContactList = contacts.filter((contact) => {
               // console.log(contact);
               return Object.values(contact)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
            });
            setSearchResults(newContactList);
         }
         else {
            setSearchResults(contacts);
         }
    };

     const value = {
         text,
         contacts,
         loading,
         retrieveContacts,
         removeContactHandler,
         addContactHandler,
         updateContactHandler,
         searchHandler,
         searchResults,
     }

     return <contactContext.Provider value={value}>
        {children}
     </contactContext.Provider>
}

export function useContact() {
    return useContext(contactContext);
}