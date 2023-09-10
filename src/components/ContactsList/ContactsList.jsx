import { remove } from 'redux/contactsSlice';
import { ListBtn, ListLi } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';


const ContactListPage = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <ul>
        {filteredContacts.map(contact => (
          <ListLi key={contact.id}>
            {contact.name}:{contact.number}
            <ListBtn type="button" onClick={() => dispatch(remove(contact.id))}>
              Delete contact
            </ListBtn>
          </ListLi>
        ))}
      </ul>
    </div>
  );
};

export default ContactListPage;
