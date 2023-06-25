import { Link, Navigate } from "react-router-dom";

const Header = (props)=> {
	return (
		<header className="d-flex justify-between align-center p-40">
				<Link to="/">
				<div className="d-flex align-center">
					<img width={40} height={40} src="/img/logo.png" alt="Logotype" />
					<div>
						<h3 className="text-uppercase"> REACT SNEAKERS</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
				</Link>
			
				<ul className="d-flex">
					<li onClick={props.onClickCart} className="mr-30 cu-p">
					<img width={18} height={18} src="/img/cart.svg" alt="Cart" />
						<span>1205 руб.</span>
					</li>
					<li>
					<Link to="/favorites">
						<img className="mr-20 cu-p" width={18} height={18} src="/img/favorite.svg" alt="Favorites" />
					</Link>
				
					
					</li>
					<li>
					<img width={18} height={18} src="/img/user.svg" alt="User" />
					</li>
				</ul>
			</header>
	)
}

export default Header;