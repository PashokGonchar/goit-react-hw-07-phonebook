import { Form, Input, Label, SubmitButton } from './ContactForm.styled';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/operations';

const ContactFormPage = () => {
 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(state => state.contactsSlice.contacts.items);
  const dispatch = useDispatch();

  const handleInputName = e => {
    setName(e.target.value);
  };
  const handleInputNumber = e => {
    setPhone(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      Notiflix.Notify.info(`${name} вже існує!`);
      return;
    }

    if (contacts.some(contact => contact.phone === phone)) {
      Notiflix.Notify.info(`${phone} вже є у цьому списку контактів!`);
      return;
    }

    const newContact = {
      name,
      phone,
    };

    dispatch(addContacts(newContact));

    setName('');
    setPhone('');
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
      />
      <Label htmlFor="number">Number</Label>
      <Input
        type="tel"
        name="phone"
        pattern="^[+]?[0-9\\.\\-\\s]{1,15}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={phone}
        onChange={handleInputNumber}
      />
      <SubmitButton type="submit">Add Contacts</SubmitButton>
    </Form>
  );
};

export default ContactFormPage;
