import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Input, Label, SubmitButton } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { add } from 'redux/contactsSlice';

const ContactFormPage = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const {contacts} = useSelector((state)=> state.contacts)
  const dispatch = useDispatch();
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputName = e => {
     setName(e.target.value);
    };
  const handleInputNumber = e => {
     setNumber(e.target.value);
    };

    const handleSubmitForm = e => {
      e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      Notiflix.Notify.info(`${name} вже існує!`);
      return;
    }

    if (contacts.some(contact => contact.number === number)) {
      Notiflix.Notify.info(`${number} вже є у цьому списку контактів!`);
      return;
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

      dispatch(add(newContact))
    
      setName('');
      setNumber('');
  };


  return (
    <Form onSubmit={handleSubmitForm}>
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleInputName}
        id={nanoid()}
      />
      <Label htmlFor="number">Number</Label>
      <Input
        type="tel"
        name="number"
        pattern="^[+]?[0-9\\.\\-\\s]{1,15}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleInputNumber}
      />
      <SubmitButton type="submit">Add Contacts</SubmitButton>
    </Form>
  );
}

export default ContactFormPage;
