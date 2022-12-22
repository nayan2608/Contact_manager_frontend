import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContact } from "../context/ContactContext";


const EditContact = () => {
   
   const {id, name, email} = useLocation().state;
   const navigate = useNavigate();
   const [newName, setNewName] = useState(name);
   const [newEmail, setNewEmail] = useState(email);
   const {updateContactHandler} = useContact();

   const update = (e) => {
      e.preventDefault();
      if(newName === "" || newEmail === ""){
         alert("all the field are mandatory!");
         return;
      }

      updateContactHandler({id, name:newName, email:newEmail});
      setNewName("");
      setNewEmail("");
      navigate("/");
   };

       return (
          <div className="ui main">
             <h2>Edit Contact</h2>
             <form className="ui form" onSubmit={update}>
                 <div className="field">
                     <label>Name</label>
                     <input 
                       type="text" 
                       name="Name" 
                       placeholder="Name" 
                       value={newName}
                       onChange={(e) => setNewName(e.target.value)}
                     />
                 </div>
                 <div className="field">
                     <label>Email</label>
                     <input 
                       type="text" 
                       name="Email" 
                       placeholder="Email" 
                       value={newEmail}
                       onChange={(e) => setNewEmail(e.target.value)}
                     />
                 </div>
                 <button className="ui button blue">Update</button>
             </form>
          </div>
       );
}

export default EditContact;