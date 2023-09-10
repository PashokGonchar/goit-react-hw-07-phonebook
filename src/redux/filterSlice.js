const { createSlice } = require('@reduxjs/toolkit');


const filterSlice = createSlice({
  name: 'filter',
  initialState : "",
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
