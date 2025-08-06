

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Store/userSlice";
import { Provider } from 'react-redux';

const LazyLogin = React.lazy(() => import('./user/login&register/Login'));
const LazyRegister = React.lazy(() => import('./user/login&register/Register'));
const LazyProductList = React.lazy(() => import('./products/ProductList'));
const LazyAddProduct = React.lazy(() => import('./products/AddProduct'));
const LazyUpdateProduct = React.lazy(() => import('./products/UpdateProduct'));
const LazyCart = React.lazy(() => import('./Cart/CartList'));
const LazyManageProducts = React.lazy(() => import('./products/ManageProducts'));
const LazyLayout = React.lazy(() => import('./common/Layot'));

// הגדרת ה-Store
const store = configureStore({
  reducer: {
    user: userReducer
  }
});
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><LazyLayout /></Suspense>}>
              <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><LazyProductList /></Suspense>}></Route>
              <Route path='/Login' element={<Suspense fallback={<div>Loading...</div>}><LazyLogin /></Suspense>}></Route>
              <Route path='/Register' element={<Suspense fallback={<div>Loading...</div>}><LazyRegister /></Suspense>}></Route>
              <Route path='/ManageProducts' element={<Suspense fallback={<div>Loading...</div>}><LazyManageProducts /></Suspense>}></Route>
              <Route path='ManageProducts/Add' element={<Suspense fallback={<div>Loading...</div>}><LazyAddProduct /></Suspense>}></Route>
              <Route path='/ManageProducts/Update' element={<Suspense fallback={<div>Loading...</div>}><LazyUpdateProduct /></Suspense>}></Route>
              <Route path='/Cart' element={<Suspense fallback={<div>Loading...</div>}><LazyCart /></Suspense>}></Route>
              <Route path='/ProductList' element={<Suspense fallback={<div>Loading...</div>}><LazyProductList /></Suspense>}></Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

//אם רוצים:
