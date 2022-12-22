import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContact } from "../context/ContactContext";

const AddContact = () => {

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const {addContactHandler} = useContact();
   const navigate = useNavigate();

  const add = (e) => {
      e.preventDefault();
      if(name === "" || email === ""){
         alert("all the field are mandatory!");
         return;
      }

      addContactHandler({name, email});
      setName("");
      setEmail("");
      navigate("/");
   };
       
       return (
          <div className="ui main">
             <h2>Add Contact</h2>
             
             <form className="ui form" onSubmit={add}>
                 <div className="field">
                     <label>Name</label>
                     <input 
                       type="text" 
                       name="Name" 
                       placeholder="Name" 
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                     />
                 </div>
                 <div className="field">
                     <label>Email</label>
                     <input 
                       type="text" 
                       name="Email" 
                       placeholder="Email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                     />
                 </div>
                 <button className="ui button blue">Add</button>
             </form>
          </div>
       );
}

export default AddContact;