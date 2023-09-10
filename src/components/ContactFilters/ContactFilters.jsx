import { useDispatch, useSelector } from 'react-redux';
import { FilterDiv, FilterLabel, FilterInput } from './ContactFilters.styled';
import { setFilter } from 'redux/filterSlice';


const Filter = () => {
  const dispatch = useDispatch()
  
const filter = useSelector(state => state.filter);

  const onInputChange = e => {
    dispatch(setFilter(e.currentTarget.value))
  }
  return (
    <FilterDiv>
      <FilterLabel htmlFor="filter">Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        name="filter"
        value={filter}
        onChange={onInputChange}
        placeholder="Enter name to search please..."
      />
    </FilterDiv>
  );
};

export default Filter;
