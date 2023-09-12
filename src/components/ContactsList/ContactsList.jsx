import { ListBtn, ListLi } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContacts, fetchContacts } from 'redux/operations';
import Loader from 'components/Loader/Loader';

const ContactListPage = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contactsSlice.contacts.items);

  const filter = useSelector(
    state => state.contactsSlice.contacts.filter.value
  );

const getFilteredContacts = () => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};
const filteredContacts = getFilteredContacts();

  const isLoading = useSelector(state => state.contactsSlice.isLoading);
  const error = useSelector(state => state.contactsSlice.error);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  return (
    <div>
      <ul>
        {error && <li>{error}</li>}

        {isLoading && <Loader />}
        {filteredContacts.map(({ id, name, phone }) => (
          <ListLi key={id}>
            {name}:{phone}
            <ListBtn type="button" onClick={() => dispatch(deleteContacts(id))}>
              Delete contact
            </ListBtn>
          </ListLi>
        ))}
      </ul>
    </div>
  );
};

export default ContactListPage;
