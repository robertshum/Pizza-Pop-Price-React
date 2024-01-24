import './App.css';
import GetDataComponent from './components/VendorProducts/VendorProducts';
import TitleBarComponent from './components/TitleBar/TitleBar';
import SearchForm from './components/SearchBox/SearchBox';
import React, { useState } from 'react';

function App() {

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  return (
    <div className="bg">
      <div className="App">
        <TitleBarComponent></TitleBarComponent>
        <SearchForm handleSearch={handleSearch}></SearchForm>
        <GetDataComponent searchValue={searchValue}></GetDataComponent>
      </div>
    </div>

  );
}

export default App;
