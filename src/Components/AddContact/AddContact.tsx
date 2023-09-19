// import './AddContact.css';
import { useState } from 'react';
import './AddContact.css'

export default function AddContact(props:any) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(false);

    const handleAddClick = () => {
        if (name && phoneNumber)  {
            const newContact = {
                id: Math.floor(Math.random() * 10000),
                name,
                phoneNumber, 
                isFavorite: false,
            }
            setName('');
            setPhoneNumber('');
            props.onAddContact(newContact);
            
        } else {
            setError(true);
            return;
        } 
       setError(false);
    
    }
    return (


        <>
        <div className="contact-form">
            <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="phone number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        </div>
        
        <button className="add-btn" onClick={handleAddClick}>Add</button>
        
        {error ? <div className="error-message"><p>Please fill all the input fields!</p></div> : null }
        
    
        </>
    )
}