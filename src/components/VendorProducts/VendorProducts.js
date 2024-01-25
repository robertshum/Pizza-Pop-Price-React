import React, { useEffect, useState, useRef } from 'react';
import './VendorProducts.css';
import { generateEncodedfetchUrls } from '../../utils/util';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';

const GetDataComponent = ({ searchValue }) => {

  const [data, setData] = useState([]);
  const fetchUrls = useRef(null);

  useEffect(() => {
    const fetchData = async () => {

      try {

        //force data to empty array using state hook.
        setData([]);

        fetchUrls.current = generateEncodedfetchUrls(searchValue);

        const fetchDataArray = await Promise.all(
          Object.values(fetchUrls.current).map(url => fetch(url))
        );

        const jsonDataArray = await Promise.all(
          fetchDataArray.map(async (response) => {
            try {
              return await response.json();
            } catch (error) {
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
                <Product item={item} itemIndex={itemIndex} />
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