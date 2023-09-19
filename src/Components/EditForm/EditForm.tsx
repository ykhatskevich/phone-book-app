import {useState} from 'react';
import './EditForm.css';
import {Contact} from '../../App';

interface EditFormProps {
  contact: Contact | null;
  onCancelEdit: () => void;
  onSaveEdit: (editedContact: Contact) => void;
}

export default function EditForm({contact, onCancelEdit, onSaveEdit}: EditFormProps) {
    const [editedContact, setEditedContact] = useState(contact || { id: 0, name: '', phoneNumber: '', isFavorite: false, });
      
    const handleSave = () => {
        onSaveEdit(editedContact);
        onCancelEdit();
    }

    return (<div id="edit-form-container">
        <input
        className="edit-form-input"
        type="text"
        value={editedContact.name}
        onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
      />
      <input 
        className="edit-form-input"
        type="text"
        value={editedContact.phoneNumber}
        onChange={(e) => setEditedContact({ ...editedContact, phoneNumber: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancelEdit}>Cancel</button>
    </div>
  );
    
}