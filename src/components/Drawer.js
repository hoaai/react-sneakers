const Drawer = ({ onClose,onRemove,items = [] } ) => {
	return (

		<div className="overlay">
			<div className="drawer">
				<h2 className="mb-30 d-flex justify-between ">Корзина<img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove" /></h2>

				{
					items.length>0 ? (<><div className="items">
					{items.map((obj) => (
						<>
						<div className="cartItem d-flex align-center mb-20">
							<div style={{
								backgroundImage:`url(${obj.imageUrl})`
							}} className="cartItemImg">

							</div>
							<div className="mr-20px flex">
								<p className="mb-5">{obj.title}</p>
								<b>{obj.price} руб.</b>
							</div>
							<img onClick={()=>onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
						</div>
						</>
							

					))}
				</div>
					<div className="cartTotalBlock">
					<ul>
						<li>
							<span>Итого:</span>
							<div></div>
							<b>21498 руб.</b>
						</li>
						<li>
							<span>Налог 5%</span>
							<div></div>
							<b>1074 руб.</b>
						</li>
					</ul>
					<button className="greenButton">Оформить заказ<img src="/img/arrow-right.svg" alt="arrow" /></button>
				</div></>):	(<div class="cartEmpty d-flex align-center justify-center flex-column flex">
					<img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt="emptyCart" />
					<h2>Корзина пуста</h2>
					<p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
					<button onClick={onClose} className="greenButton">
						<img   src="/img/arrow-right.svg" alt="Arrow" /> Вернуться назад
					</button>
				</div>)
				}
			
			</div>
		</div>

	)
}

export default Drawer;