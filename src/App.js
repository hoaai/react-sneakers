import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import axios from "axios";
import { useState } from "react";
import Favorites from "./pages/Favorites";
import AppContext from "./context";




function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [cartOpened, setCartOpened] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	React.useEffect(() => {
		// fetch("https://648ea6c675a96b66444421a3.mockapi.io/items").then(res => {
		// 	return res.json()
		// }).then(json => {
		// 	setItems(json);
		// }); аналог axios
		async function fetchData() {
			// setIsLoading(true)
			const cartResponse = await axios.get("https://648ea6c675a96b66444421a3.mockapi.io/cart")
			const favoriteResponse = await axios.get("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/favorite")
			const itemsResponse = await axios.get("https://648ea6c675a96b66444421a3.mockapi.io/items")

			setIsLoading(false)
			setCartItems(cartResponse.data);
			setFavorites(favoriteResponse.data);
			setItems(itemsResponse.data);
		}
		fetchData();
	}, []);

	const onAddToCart = (obj) => {
		if (cartItems.find((item) => Number(item.id) == Number(obj.id))) {
			axios.delete(`https://648ea6c675a96b66444421a3.mockapi.io/cart/${obj.id}`);
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
		} else {
			axios.post("https://648ea6c675a96b66444421a3.mockapi.io/cart", obj);
			setCartItems((prev) => [...prev, obj])
		}


	}

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => Number(favObj.id) == Number(obj.id))) {
				axios.delete(`https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/favorite/${obj.id}`);
				setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));

			} else {
				const { data } = await axios.post("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/favorite", obj);
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert("Не удалось добавить в фавориты")
		}
	}

	const onRemoveItem = (id) => {
		axios.delete(`https://648ea6c675a96b66444421a3.mockapi.io/cart/${id}`);
		// setCartItems(prev => [...prev, obj])
		setCartItems((prev) => prev.filter(item => item.id !== id))
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const isItemAdded = (id) => {
		return cartItems.some(obj=>Number(obj.id) === Number(id))
	}


	return (
		<AppContext.Provider value={{items,cartItems,favorites,isItemAdded,onAddToFavorite,setCartOpened,setCartItems}}>
			<div className="wrapper clear">
				{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route
						path="/"
						element={
							<Home
								items={items}
								cartItems={cartItems}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
						exact
					/>
					<Route
						path="/favorites"
						element={
							<Favorites
								
							/>
						}
						exact
					/>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
