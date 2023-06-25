import Card from "./components/Card";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import Favorites from "./pages/Favorites";


function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])
	const [searchValue, setSearchValue] = useState("")
	const [cartOpened, setCartOpened] = useState(false)

	useEffect(() => {
		// fetch("https://648ea6c675a96b66444421a3.mockapi.io/items").then(res => {
		// 	return res.json()
		// }).then(json => {
		// 	setItems(json);
		// }); аналог axios
		axios.get("https://648ea6c675a96b66444421a3.mockapi.io/items").then(response => {
			setItems(response.data)
		})
		axios.get("https://648ea6c675a96b66444421a3.mockapi.io/cart").then(response => {
			setCartItems(response.data)
		})
		axios.get("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/favorite").then(response => {
			setFavorites(response.data)
		})
	}, []);

	const onAddToCart = (obj) => {
		axios.post("https://648ea6c675a96b66444421a3.mockapi.io/cart", obj).then(res => setCartItems(prev => [...prev, res.data]))
		// setCartItems(prev => [...prev, obj])
	}

	const onAddToFavorite =async (obj) => {
		try {
			if (favorites.find((favObj) => favObj.id == obj.id)) {
				axios.delete(`https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/favorite/${obj.id}`);
				
			} else {
				const {data} =await axios.post("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/favorite", obj);			
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


	return (
		<div className="wrapper clear">

			{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
			<Header onClickCart={() => setCartOpened(true)} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							items={items}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							onChangeSearchInput={onChangeSearchInput}
							onAddToFavorite={onAddToFavorite}
							onAddToCart={onAddToCart}
						/>
					}
					exact
				/>
				<Route
					path="/favorites"
					element={
						<Favorites items={favorites}
							onAddToFavorite={onAddToFavorite}
						/>
					}
					exact
				/>
			</Routes>
		</div>
	);
}

export default App;
