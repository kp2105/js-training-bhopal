import './App.css';

import React, { useState } from 'react';


import Listing from './components/Listing';


const jsondata = [
    
  {
    "name": "src",
    "isFolder": true,
    "items": [
      {
        "name": "components",
        "isFolder": true,
        "items": [
          {
            "name": "index.js",
            "isFolder": false,
            "items": []
          },
          {
            "name": "app.js",
            "isFolder": false,
            "items": []
          }
        ]
      },
      {
        "name": "assets",
        "isFolder": true,
        "items": [
          {
            "name": "image1.png",
            "isFolder": false,
            "items": []
          },
          {
            "name": "image2.png",
            "isFolder": false,
            "items": []
          }
        ]
      }
    ]
  },
  {
    "name": "package.json",
    "isFolder": false
  }
  ]



function App() {

  return (
    <>
      <Listing  data={jsondata} />
    </>
  );
}

export default App;
