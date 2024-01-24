import React, { useState } from 'react';
import './SearchBox.css'

const SearchBox = ({ handleSearch }) => {

    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchValue); // Call the handleSearch function from props, Pass the searchValue to the handleSearch function
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value); //Update the searchValue state with the input value
    }

    return (
        <form onSubmit={handleSubmit} role="search">
            <label htmlFor="search">Search for stuff</label>
            <input id="search"
                type="search"
                placeholder="Search for product..."
                autoFocus 
                required
                value={searchValue} // Bind the input value to the searchValue state
                onChange={handleChange} // Call handleChange when the input value changes
            />
            <button type="submit">Go</button>
        </form>
    );
};

export default SearchBox;
