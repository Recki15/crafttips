import React, { useState } from 'react';
import { Form, FormGroup, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOptions, setFilterOptions] = useState({
      option1: false,
      option2: false,
      option3: false,
    });
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearchQueryChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleFilterOptionChange = (event) => {
      const { name, checked } = event.target;
      setFilterOptions((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      // make API call with searchQuery and filterOptions
      // set searchResults state with response
      setSearchResults(mockSearchResults); // for demo purposes only
    };
  
    const mockSearchResults = [
      { id: 1, title: 'Search Result 1', option1: true, option2: false, option3: true },
      { id: 2, title: 'Search Result 2', option1: false, option2: true, option3: true },
      { id: 3, title: 'Search Result 3', option1: true, option2: true, option3: false },
    ];
  
    const filteredResults = searchResults.filter((result) => {
      const { option1, option2, option3 } = filterOptions;
      return (
        (!option1 || result.option1) &&
        (!option2 || result.option2) &&
        (!option3 || result.option3)
      );
    });
  
    return (
      <div className="container mt-5">
        <Form onSubmit={handleSearchSubmit}>
          <FormGroup className="mb-3 d-flex align-items-center">
            <input type="text" class="form-control" id="" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search" required="" />
          </FormGroup>
          <FormGroup className="mb-3 d-flex align-items-center">
            <label>Filter by:</label>
            <FormGroup check className="ms-3">
              <label check>
                <input
                  type="checkbox"
                  name="option1"
                  checked={filterOptions.option1}
                  onChange={handleFilterOptionChange}
                />
                {' '}
                Hammer
              </label>
            </FormGroup>
            <FormGroup check className="ms-3">
              <label check>
                <input
                  type="checkbox"
                  name="option2"
                  checked={filterOptions.option2}
                  onChange={handleFilterOptionChange}
                />
                {' '}
                Nails
              </label>
            </FormGroup>
            <FormGroup check className="ms-3">
              <label check>
                <input
                  type="checkbox"
                  name="option3"
                  checked={filterOptions.option3}
                  onChange={handleFilterOptionChange}
                />
                {' '}
                Ducttape
              </label>
            </FormGroup>
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <Button type="submit" color="primary">Search</Button>
          </FormGroup>
        </Form>
        <hr />
        <ListGroup>
          {filteredResults.map((result) => (
            <ListGroupItem key={result.id}>
              {result.title}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  };
  
  export default SearchPage;