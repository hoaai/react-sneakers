import React from "react";
import axios from "axios";

import Info from "../Card/Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)


	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post("https://6491cdea2f2c7ee6c2c8eea4.mockapi.io/orders", {
				items: cartItems,
			});

			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete("https://648ea6c675a96b66444421a3.mockapi.io/cart/" + item.id);
				await delay(1000)
			}

		} catch (error) {
			alert("Не удалось создать заказ:(")
		}
		setIsLoading(false)
	}

	return (
		<div className={`${styles.overlay} ${opened?styles.overlayVisible:""}`}>
			<div className={styles.drawer}>
				<h2 className="mb-30 d-flex justify-between ">Корзина<img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove" /></h2>

				{
					items.length > 0 ? (<><div className="items">
						{items.map((obj) => (
							<>
								<div key={obj.id} className="cartItem d-flex align-center mb-20">
									<div style={{
										backgroundImage: `url(${obj.imageUrl})`
									}} className="cartItemImg">

									</div>
									<div className="mr-20px flex">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
								</div>
							</>


						))}
					</div>
						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%</span>
									<div></div>
									<b>{Math.floor(totalPrice * 0.05)} руб.</b>
								</li>
							</ul>
							<button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ<img src="/img/arrow-right.svg" alt="arrow" /></button>
						</div></>) : (
						<Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"} description={isOrderComplete ? `Ваш заказ #${orderId} будет передан курьеру` : "Добавьте хотя бы одну пару кроссовок"} image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} />
					)
				}

			</div>
		</div>

	)
}

export default Drawer;