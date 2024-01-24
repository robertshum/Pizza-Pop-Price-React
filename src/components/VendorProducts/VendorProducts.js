import React, { useEffect, useState, useRef } from 'react';
import './VendorProducts.css';
// import config from '../../config/config.json';
import { generateEncodedfetchUrls } from '../../utils/util';
import Loading from '../Loading/Loading';

const GetDataComponent = ({ searchValue }) => {

  const [data, setData] = useState([]);
  const fetchUrls = useRef(null);

  useEffect(() => {
    const fetchData = async () => {

      try {

        //force data to empty array using state hook.
        setData([]);

        // fetchUrls.current = searchValue === '' ? generateFetchUrls(encodeURIComponent(config.default_search_value)) : generateFetchUrls(encodeURIComponent(searchValue));

        fetchUrls.current = generateEncodedfetchUrls(searchValue);

        const fetchDataArray = await Promise.all(
          Object.values(fetchUrls.current).map(url => fetch(url))
        );

        const jsonDataArray = await Promise.all(
          fetchDataArray.map(async (response) => {
            try {
              return await response.json();
            } catch (error) {
              // Handle the JSON parsing error gracefully
              console.error('Error parsing JSON:', error);
              return null; // Return a default value or null
            }
          })
        );

        // Remove any null values from the jsonDataArray
        const filteredJsonDataArray = jsonDataArray.filter(data => data !== null);

        setData(filteredJsonDataArray);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchValue]);


  return (
    <div>
      {data.length > 0 ? (
        <div className="container">
          {data.map((dataArray, index) => (
            <ul className="list" key={index}>
              <div className="vendor-title">
                {Object.keys(fetchUrls.current)[index]}
              </div>
              {dataArray.map((item, itemIndex) => (
                // TODO should associate the code below as another component (like an item)
                <a className="item-container" key={itemIndex} href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div className="item-container-frame">
                    <div className="item-container-title">{item.title}</div>
                    <div className="item-container-price">{item.price}</div>
                  </div>
                </a>
              ))}
            </ul>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default GetDataComponent;