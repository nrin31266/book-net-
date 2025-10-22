import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import router from './routers/router';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  )
}

export default App