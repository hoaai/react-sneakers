import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useEffect, useState } from "react";


function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [cartOpened, setCartOpened] = useState(false)

	useEffect(() => {
		fetch("https://648ea6c675a96b66444421a3.mockapi.io/items").then(res => {
			return res.json()
		}).then(json => {
			setItems(json);
		})
	}, []);

	const onAddToCart = (obj) => {
		setCartItems(prev => [...prev, obj])
	}


	return (
		<div className="wrapper clear">

			{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
			<Header onClickCart={() => setCartOpened(true)} />
			<div className="content p-40">
				<div className="d-flex align-center mb-40 justify-between">
					<h1>Все кроссовки</h1>
					<div className="search-block">
						<img src="/img/search.svg" alt="Search" />
						<input type="text" placeholder="Поиск..." />
					</div>
				</div>
				<div className="d-flex flex-wrap">

					{/* <Card title={'Мужские Кроссовки Nike Blazer Mid Suede'} price={9000} imageUrl='/img/sneakers/2.jpg'/> */}


					{items.map((item) => {
						return (
							<Card
								title={item.title}
								price={item.price}
								imageUrl={item.imageUrl}
								onFavorite={() => console.log("Add to cart")}
								onPlus={(obj) => onAddToCart(obj)} />
						)
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
