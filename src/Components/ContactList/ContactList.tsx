import ContactItem from "../ContactItem/ContactItem";
import { useState, useEffect } from 'react';
import '../../App.css';



export default function ContactList (props:any) {
    const [contactList, setContactList] = useState(([]));


    // const item:any = JSON.parse(localStorage.getItem(`contacts`));


    const handleDeleteContact = (index:number) => {
        const newContacts = contactList.filter((i:any) => i.id != index);
        setContactList(newContacts);
        
       }

    
  
    useEffect(() => {
      setContactList(props.contacts)
    }, [props.contacts])
   
   console.log(props);

  return (
    
    <div>  
    {props.contacts.map((contact:any) => {
      console.log(contact);
        return (
            <div className={`contact-container ${props.darkMode ? 'dark-mode' : 'light-mode'}`} key={contact.id}>
  <ContactItem contact={contact} onDelete={props.onDeleteContact} onEditContact={props.onEditContact} onToggleFavorite={props.onToggleFavorite} add={props.add}
  isFavorite={contact.isFavorite} darkMode={props.darkMode}
  
  />
  
  </div>
  )})}
  
    
    </div>
        
    
  )

}