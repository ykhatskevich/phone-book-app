import {Contact} from '../../App';
import './FavoriteContacts.css';


interface FavoriteContactsProps {
    favoriteContacts: Contact[];
    onToggleFavorite:any;
    onRemoveFromFavorite:any;
    
    
  }


export default function FavoriteContacts(props: any) {
    return (
        <div>
            <h1 className="fav-contacts-h1">Favorite Contacts</h1>
            <div>
            {props.favoriteContacts.length === 0 ? (
          <p>No favorite contacts yet</p>
        ) : (
          <ul>
            {props.favoriteContacts.map((contact:any) => (
              <div>
              <div className="favorite-contact-container"key={contact.id}>
                <div className="fav-item">
                <p><span>Name:</span> {contact.name}</p>
                <p><span>Phone Number:</span> {contact.phoneNumber}</p>
                <button className="add-to-favorite" onClick={() => props.remove(contact)}>Remove from Favorites</button>
                </div>
              </div>
              </div>
            ))}
          </ul>
        )}
            </div>
        </div>
    )
}