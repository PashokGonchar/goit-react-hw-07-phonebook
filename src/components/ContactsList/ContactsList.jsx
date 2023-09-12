import { ListBtn, ListLi } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContacts, fetchContacts } from 'redux/operations';
import Loader from 'components/Loader/Loader';
import { nanoid } from 'nanoid';

const ContactListPage = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contactsSlice.contacts.items);

  // const filter = useSelector(
  //   state => state.contactsSlice.contacts.filter.value
  // );

  // const normalizedFilter = filter.toLowerCase();
  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(normalizedFilter)
  // );

  const isLoading = useSelector(state => state.contactsSlice.isLoading);
  const error = useSelector(state => state.contactsSlice.error);

  useEffect(() => {
    dispatch(fetchContacts()).then(res => console.log('res', res));
  }, [dispatch]);

  return (
    <div>
      <ul>
        {error && <li>{error}</li>}

        {isLoading && <Loader />}
        {contacts.map(({ id, name, phone }) => (
          <ListLi key={nanoid()}>
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
