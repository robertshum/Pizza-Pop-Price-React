import './App.css';
import GetDataComponent from './components/GetDataComponent/GetDataComponent';
import TitleBarComponent from './components/TitleBarComponent/TitleBarComponent';
import SearchForm from './components/SearchComponent/SearchComponent';
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
