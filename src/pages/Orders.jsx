import Card from "../components/Card";
import React from "react";
import AppContext from "../context";
import axios from "axios";


function Orders() {
	const { onAddToFavorite, onAddToCart } = React.useContext(AppContext)
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/orders");
				// data.map(obj => obj.items).flat()
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setIsLoading(false)
			} catch (error) {
				alert("Не удалось получить заказы");
				console.error(error);
			}
		})()
	}, []);
	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>
					Мои заказы
				</h1>
			</div>
			<div className="d-flex flex-wrap">
				{(isLoading ? [...Array(8)] : orders).map((item, index) => {
					return (
						<Card
							key={index}
							loading={isLoading}
							{...item}
						/>

					)
				})}
			</div>
		</div>
	)
}

export default Orders;