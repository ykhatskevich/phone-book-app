// import './AddContact.css';
import { useState } from 'react';
import './AddContact.css'

export default function AddContact(props:any) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState<boolean|string>(false);

    const checkPhoneNumber = () => {
        
        if(!/^\d*$/.test(phoneNumber)) {
            return 'contain letters'
            

        } else {
            return 'contain numbers'
        }
    }

    const handleAddClick = () => {
        const testValidation = checkPhoneNumber();
        console.log(testValidation);
        if (testValidation === 'contain letters') {
            setError('Phone number should contain only digits!');
            return;

        } 
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
            setError('The field is empty');
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
        
        {error === 'The field is empty' ? <div className="error-message"><p>Please fill all the input fields!</p></div> : null }
        {error === 'Phone number should contain only digits!' ? <p>{error}</p> : null }
        
    
        </>
    )
}