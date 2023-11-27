import React from 'react';
import './App.scss';
import Login from './containers/Login';


export default function App() {
  return (
    <>
      <div className='app_top'></div>
      <div className='app_body'>
        <Login></Login>
      </div>
      <div className='app_bottom'></div>
    </>
  )
};
