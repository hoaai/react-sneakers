import Card from "../components/Card";
import React from "react";
import axios from "axios";
import AppContext from "../context";



function Orders() {
	const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/orders")
				// console.log(data.map(obj=>obj.items).flat())
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []).flat())
				setIsLoading(false)
			} catch (error) {
				alert("Ошибка при запросе заказов")
			}
		})()
	}, [])

	return (
		<div className="content p-40">
			<div className="d-flex align-center mb-40 justify-between">
				<h1>
					Мои заказы
				</h1>
			</div>
			<div className="d-flex flex-wrap">
				{(isLoading ? [...Array(12)] : orders).map((item, index) => {
					return (
						<Card key={index}
							loading={isLoading}
							{...item} />

					)
				})}
			</div>
		</div>
	)
}

export default Orders;