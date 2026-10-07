import React from 'react';
import {  RouterProvider } from 'react-router';

import { router } from './App.route.jsx';
import { useEffect } from 'react';
import { useAuth } from '../features/auth/hook/useAuth.js';


function App() {
  const {handleGetme}=useAuth()
   useEffect(function(){
    handleGetme()
  },[])
  return (
         <RouterProvider router ={router}/>
  );

}

export default App;
