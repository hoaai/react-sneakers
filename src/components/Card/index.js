import styles from './Card.module.scss'
import {useState} from 'react'
import ContentLoader from "react-content-loader"
import React from 'react'
import AppContext from '../../context'


const Card = ({id,imageUrl,title,price,onPlus,onFavorite,favorited=false,added=false,loading=false}) => {

	const {isItemAdded} = React.useContext(AppContext)
	const [isFavorite,setIsFavorite]=useState(favorited)
	const obj = {id,parentId:id,imageUrl,title,price};

	const onClickPlus = () => {
		onPlus(obj)
	}

	const onClickFavorite = () => {
		onFavorite(obj)
		setIsFavorite(!isFavorite);
	}

	return (
		<div className={styles.card}>
			{
				loading ? 	 
				(<ContentLoader 
				speed={2}
				width={155}
				height={200}
				viewBox="0 0 155 200"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			 >
				<rect x="0" y="-1" rx="10" ry="10" width="155" height="90" /> 
				<rect x="0" y="135" rx="6" ry="6" width="100" height="15" /> 
				<rect x="0" y="173" rx="6" ry="6" width="80" height="24" /> 
				<rect x="0" y="110" rx="6" ry="6" width="155" height="15" /> 
				<rect x="124" y="169" rx="9" ry="9" width="32" height="32" />
			 </ContentLoader>) : 
			 (<>
			{onFavorite && <div onClick={onClickFavorite} className={styles.favorite}>
				<img src={isFavorite? '/img/heart-locked.svg': '/img/heart-unlocked.svg'} alt="unlocked" />
			</div>}
			<img width={133} height={112} src={imageUrl} alt="sneakers" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
					{onPlus && <img className={styles.plus} onClick={onClickPlus} src={ isItemAdded(id) ?`/img/btn-checked.svg`: `/img/btn-plus.svg`} alt="Plus" />}
			</div>
			</>)
			}
		</div>
	)
}

export default Card;