import React, { useEffect, useState } from 'react';
import './GetDataComponent.css';
import config from '../../config.json';

const defaultSearchValue = encodeURIComponent('Pillsbury Pizza Pops');
//const API_URL = config.protocol + config.api_url + ":" + config.port;
const API_URL = 'http://localhost:3000';
let encodedSearchValue = defaultSearchValue;
let fetchUrls = generateFetchUrls(encodedSearchValue);

function generateFetchUrls(encodedSearchValue) {
    return {
        'Save-on-Foods': `${API_URL}/GetSaveOnFoodsData?search=${encodedSearchValue}`,
        'Superstore': `${API_URL}/GetSuperstoreData?search=${encodedSearchValue}`,
        'Pricesmart': `${API_URL}/GetPricesmartData?search=${encodedSearchValue}`,
        'Your Independent Grocer': `${API_URL}/GetYourIndependentGrocerData?search=${encodedSearchValue}`
    }
    // return {
    //     'Save-on-Foods': `${API_URL}/GetSaveOnFoodsData?search=${encodedSearchValue}`,
    //     'Pricesmart': `${API_URL}/GetPricesmartData?search=${encodedSearchValue}`
    // }
};

// function generateFetchUrls(encodedSearchValue) {
//     return {
//         'Superstore': `http://localhost:3000/GetSuperstoreData?search=${encodedSearchValue}`
//     }
// };

const GetDataComponent = ({ searchValue }) => {
    const [data, setData] = useState([]);  // Initialize data state as an empty array

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {


    //         const url = `http://localhost:3000/GetSuperstoreData?search=${encodedSearchValue}`;
    //         //const url = 'http://localhost:3000/GetSuperstoreData?search=Pillsbury Pizza Pops';

    //         console.log("url: " + url);
    //         const response = await fetch(url);
    //         const jsonData = await response.json();
    //         console.log(jsonData);
    //         setData(jsonData);
    //       } catch (error) {
    //         console.error('Error:', error);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    useEffect(() => {
        const fetchData = async () => {

            try {

                //force data to empty array using state hook.
                setData([]);
                //TODO maybe move input validation somewhere else
                fetchUrls = searchValue === '' ? generateFetchUrls(defaultSearchValue) : generateFetchUrls(encodeURIComponent(searchValue));

                // const fetchDataArray = await Promise.all(
                //     Object.values(fetchUrls).map(url => fetch(url))
                // );
                // const jsonDataArray = await Promise.all(
                //     fetchDataArray.map(response => response.json())
                // );
                // setData(jsonDataArray);



                const fetchDataArray = await Promise.all(
                    Object.values(fetchUrls).map(url => fetch(url))
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
            } finally {
                //TODO call endpoint to close all browser instances
                //await Promise.all(fetch('http://localhost:3000/closeBrowser'));

            }
        };

        fetchData();
    }, [searchValue])

    // return (
    //     <div>
    //         <p> Loading...</p>
    //     </div>
    // );

    return (
        <div>
            {data.length > 0 ? (
                <div className="container">
                    {data.map((dataArray, index) => (
                        <ul className="list" key={index}>
                            <div className="vendor-title">
                                {Object.keys(fetchUrls)[index]}
                            </div>
                            {dataArray.map((item, itemIndex) => (
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
                //Loading elements
                <div className="loading-container">
                    <div className="loading-text">Loading...</div>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            )}
        </div>
    );
};

export default GetDataComponent;