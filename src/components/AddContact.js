import React from "react";
import { Navigate } from "react-router-dom";

class AddContact extends React.Component{

   state = {
     name:"",
     email:"",
     isContactAdded: false
   };

   add = (e) => {
      e.preventDefault();
      if(this.state.name === "" || this.state.email === ""){
         alert("all the field are mandatory!");
         return;
      }

      this.props.addContactHandler(this.state);
      this.setState({name: "", email: "", isContactAdded: true});
   };

   render() {

       const { isContactAdded } = this.state;
       
       return (
          <div className="ui main">
             <h2>Add Contact</h2>
 
             {isContactAdded && (
                    <Navigate to="/" replace="true"/>
              )}

             
             <form className="ui form" onSubmit={this.add}>
                 <div className="field">
                     <label>Name</label>
                     <input 
                       type="text" 
                       name="Name" 
                       placeholder="Name" 
                       value={this.state.name}
                       onChange={(e) => this.setState({ name: e.target.value })}
                     />
                 </div>
                 <div className="field">
                     <label>Email</label>
                     <input 
                       type="text" 
                       name="Email" 
                       placeholder="Email" 
                       value={this.state.email}
                       onChange={(e) => this.setState({ email: e.target.value })}
                     />
                 </div>
                 <button className="ui button blue">Add</button>
             </form>
          </div>
       );
   }
}

export default AddContact;