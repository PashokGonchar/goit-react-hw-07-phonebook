import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    add: (state, action) => ({
      ...state,
      contacts: [...state.contacts, { ...action.payload }],
    }),
    remove: (state, { payload }) => ({
      ...state,
      contacts: state.contacts.filter(contact => contact.id !== payload),
    }),
  },
});

export const { add, remove } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;