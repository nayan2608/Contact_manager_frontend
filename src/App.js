import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./components/AddContact";
import ContactDetails from "./components/ContactDetails";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import Header from "./components/Header";
import { ContactContextProvider } from "./context/ContactContext";

function App(){

   return (
      <div className="ui container">
        <Router>
           <Header />
           <ContactContextProvider>
           <Routes>
              <Route path="/" element={<ContactList />}/>
              <Route path="/add" element={<AddContact />}/>
              <Route path="/edit" element={<EditContact />}/>
              <Route path="/contact/:id" element={<ContactDetails />} />
           </Routes>
           </ContactContextProvider>
        </Router>
      </div>
   );
}

export default App;