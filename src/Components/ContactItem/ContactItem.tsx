import './ContactItem.css';
// new stuff
import EditForm from '../EditForm/EditForm';


export default function ContactItem (props:any) {



  console.log(props.contact);

  const addToFavourite = (contact:any) => {
    console.log(contact);
    contact.isFavorite = true;
    props.add(contact);
  }
    
    return (
        
        <div className={`contact-container ${props.darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className={`contact-item ${props.darkMode ? 'dark-mode' : 'light-mode'}`} key={props.contact.id}> 
        <div className="contact-details">
        <span>{props.contact.name}</span>
        <span>&nbsp;</span>
        <span className="phone-number">{props.contact.phoneNumber}</span>

        </div>
            <button className="edit-btn" onClick={()=>props.onEditContact(props.contact.id)}>Edit</button>
            <button className="delete-btn" onClick={() => props.onDelete(props.contact.id)}>Delete</button>
            {props.contact.isFavorite ? null : <button className="add-to-favorite" onClick={()=>addToFavourite(props.contact)}>Add to Favorites</button>}
            

            
        </div>
        </div>
    )
}