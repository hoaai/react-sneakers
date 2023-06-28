import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import axios from "axios";
import { useState } from "react";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";




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
			try {
				const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([axios.get("https://648ea6c675a96b66444421a3.mockapi.io/cart"), axios.get("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/favorite"), axios.get("https://648ea6c675a96b66444421a3.mockapi.io/items")])

				setIsLoading(false)
				setCartItems(cartResponse.data);
				setFavorites(favoriteResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert("Ошибка при запросе данных");
				console.error(error);
			}
		}
		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) == Number(obj.id));
			if (findItem) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://648ea6c675a96b66444421a3.mockapi.io/cart/${findItem.id}`);

			} else {
				setCartItems((prev) => [...prev, obj])
				const { data } = await axios.post("https://648ea6c675a96b66444421a3.mockapi.io/cart", obj);
				setCartItems((prev) => prev.map(item => {
					if (item.parentId == data.parentId) {
						return {
							...item,
							id: data.id
						}
					}
					return item
				}))


			}
		} catch (error) {
			alert("Ошибка при добавлении в корзину");
			console.error(error);
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
		try {
			axios.delete(`https://648ea6c675a96b66444421a3.mockapi.io/cart/${id}`);
			// setCartItems(prev => [...prev, obj])
			setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
		} catch (error) {
			alert("Ошибка при удалении из корзины");
			console.error(error);
		}
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const isItemAdded = (id) => {
		return cartItems.some(obj => Number(obj.parentId) === Number(id))
	}


	return (
		<AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
			<div className="wrapper clear">

				<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />

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
							<Favorites />
						}
						exact
					/>

					<Route
						path="/orders"
						element={
							<Orders />
						}
						exact
					/>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
