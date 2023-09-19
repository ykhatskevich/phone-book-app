import { useState, useEffect } from 'react';
import './App.css';
import AddContact from './Components/AddContact/AddContact';
import ContactList from './Components/ContactList/ContactList';
import Logo from './Components/Logo/Logo';
import EditForm from './Components/EditForm/EditForm';
import SearchBar from './Components/SearchBar/SearchBar';
import FavoriteContacts from './Components/FavoriteContacts/FavoriteContacts';
import useDarkMode from './hooks/useDarkMode';

export interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
  isFavorite: boolean;
}

function App() {
 const [contacts, setContacts] = useState<Contact[]>([]);
 const [editContact, setEditContact] = useState<Contact | null>(null);
 const [isEditing, setIsEditing] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
 const [showFavorites, setShowFavorites] = useState(false);
 const [darkMode, setDarkMode] = useState(false);
//  const [favoriteContactsCount, setFavoriteContactsCount] = useState<number>(0);


 useEffect(() => {
  console.log('Updated favoriteContacts:', favoriteContacts);
}, [favoriteContacts]);

// useEffect(() => {
//   setFavoriteContactsCount(favoriteContacts.length);
// }, [favoriteContacts]);


const {isDarkMode, setIsDarkMode} = useDarkMode(); 


const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';


 const handleAddContact = (newContact:any) => {
  setContacts([...contacts, newContact]);
  localStorage.removeItem(`contacts`)
  localStorage.setItem(`contacts`, JSON.stringify(newContact))
  
 }

 const scrollToEditForm = () => {
  const editFormContainer = document.getElementById('edit-form-container');
  if (editFormContainer) {
    editFormContainer.scrollIntoView({ behavior: 'auto' });
  }
};



 const handleEditContact = (contactId:number) => {
  const contactToEdit = contacts.find((contact: Contact) => contact.id === contactId);

  setEditContact(contactToEdit ?? null);
  setIsEditing(true);
  setTimeout(() => {scrollToEditForm()}, 0)
  

 }

 const handleSaveEdit = (editedContact: Contact) =>{
  const updatedContacts = contacts.map((contact) => contact.id === editedContact.id ? editedContact : contact);
  setContacts(updatedContacts);

  setEditContact(null);
  setIsEditing(false);
 }

 const handleDeleteContact = (index:number) => {
  const newContacts = contacts.filter((contact:any) => contact.id !== index);
  setContacts(newContacts);
 }


 const handleSearch = (query: string) => {
  setSearchQuery(query);
 }

 const handleToggleFavorite = (updatedContact: Contact) => {
  const isAlreadyFavorite = favoriteContacts.some(
    (contact) => contact.id === updatedContact.id
  );

  


  const updatedContacts = contacts.map((contact) =>
    contact.id === updatedContact.id
      ? { ...contact, isFavorite: !isAlreadyFavorite } 
      : contact
  );
  setContacts(updatedContacts);
};

const addToFavorites = (contactToAdd:Contact) => {
  const updatedContact = { ...contactToAdd, isFavorite: true };
  setFavoriteContacts((prevFavorites)=>[...prevFavorites, updatedContact]);
  console.log('Updated favoriteContacts:', favoriteContacts);
  
};

const removeFromFavorites = (contactToRemove:Contact) => {
  console.log(contactToRemove);
  const changeFavourite = contacts.find((contact:any) => contact.id === contactToRemove.id);
  if(changeFavourite !== undefined){
    changeFavourite.isFavorite = false;
  }
  const filteredContacts = favoriteContacts.filter((contact) => contact.id !== contactToRemove.id)
  setFavoriteContacts(filteredContacts);
  
}



 const filteredContacts = contacts.filter((contact) => 
 contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

 const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};

 
 
 

  return (
    <div className={`App ${modeClass}`}>
    <Logo />
    <button className="toggle-dark-mode" onClick={()=>setIsDarkMode(prev=>!prev)}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
    <div className="content-container">
    <AddContact onAddContact={handleAddContact} />
    <SearchBar onSearch={handleSearch} />
    <button className="show-favorites" onClick={() =>setShowFavorites(!showFavorites)}>{showFavorites ? `Hide Favorite Contacts (${favoriteContacts.length})` : `Show Favorite Contacts (${favoriteContacts.length})`}</button>
    {showFavorites && <FavoriteContacts favoriteContacts={favoriteContacts} onToggleFavorite={handleToggleFavorite} onRemoveFromFavorite={removeFromFavorites} remove={removeFromFavorites}/>}
    <div className="edit-form-container">
    {isEditing && (
      <EditForm
      
        
        contact={editContact}
        onCancelEdit={() => setIsEditing(false)}
        onSaveEdit={handleSaveEdit}
      />
    )}
    </div>
    <div className="contacts-container">
    <div className="contact-list-container">
      {/* ns */}
    <ContactList contacts={searchQuery ? filteredContacts : contacts} onDeleteContact={handleDeleteContact} onEditContact={handleEditContact} add={addToFavorites} darkMode={darkMode}
    
    />
    
    
    </div> 
    </div>
    </div>

    </div>
  );
}

export default App;


