import React from 'react';
import puppeteer from "puppeteer-core";

const PuppeteerComponent = () => {

    //JS code
    const myFunction = () => {
        //my js logic here

    };

    //Other code...

    return (
        <div>
            {/* JSX code here */}
            <button onClick={myFunction}> Run Javascript </button>
        </div>
    )

};

export default PuppeteerComponent;