import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import router from './Routing/MainRouting';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './components/day4/redux/store';
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> 
     <Provider store={store}>
    <RouterProvider router={router}> </RouterProvider>
    </Provider> 
  </React.StrictMode>
);

