import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Router } from "react-router-dom";
import './index.scss';
import App from './App';
import 'macro-css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<BrowserRouter>
		<App/>
	</BrowserRouter>
  </React.StrictMode>
);
{/* <Route
path="/"
element={
  <Home
	 items={items}
	 searchValue={searchValue}
	 setSearchValue={setSearchValue}
	 onChangeSearchInput={onChangeSearchInput}
	 onAddFavorite={onAddFavorite}
	 onAddToCart={onAddToCart}
  />
}
exact
/>
</Routes>" , также надо изменить import, добавить "Routes":  import { Route, Routes } from "react-router-dom";
P.s для тех кто делает сейча */}

