import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './App.route.jsx';
import { useAuth } from '../features/auth/hook/useAuth.js';
import { ToastProvider } from '../features/shared/context/ToastContext.jsx';

function App() {
  const {handleGetme}=useAuth()
   useEffect(function(){
    handleGetme()
  },[])
  return (
    <ToastProvider>
      <RouterProvider router={router}/>
    </ToastProvider>
  );

}

export default App;
