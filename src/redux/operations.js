import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeContact, setContact } from './contactsSlice';

const CONTACTS_API = 'https://64fdaf3f596493f7af7e714a.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${CONTACTS_API}/contacts`);

      if (!response.ok) {
        throw new Error('Error');
      }

      const data = await response.json();
console.log("data", data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContacts',
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const contact = {
        id:data.id,
        name: data.name,
        phone: data.phone,
      };

      const response = await fetch(`${CONTACTS_API}/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error('Sorry cant add your contact');
      }

      dispatch(setContact(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      console.log("id", id);
      const response = await fetch(`${CONTACTS_API}/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.log(2);
        throw new Error('Sorry we cant delete your contact');
      }
      console.log(3);
      dispatch(removeContact(id));
      console.log(4);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
