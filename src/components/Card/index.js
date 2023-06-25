import styles from './Card.module.scss'
import {useEffect, useState} from 'react'


const Card = ({id,imageUrl,title,price,onPlus,onFavorite,favorited=false}) => {

	const onClickButton = () => {
		{ alert("Add") }
	}

	const [isAdded,setIsAdded]=useState(false);
	const [isFavorite,setIsFavorite]=useState(favorited)

	const onClickPlus = () => {
		onPlus({imageUrl,title,price})
		setIsAdded(!isAdded);
	}

	const onClickFavorite = () => {
		onFavorite({id,imageUrl,title,price})
		setIsFavorite(!isFavorite);
	}

	return (
		<div className={styles.card}>
			<div onClick={onClickFavorite} className={styles.favorite}>
				<img src={isFavorite? '/img/heart-locked.svg': '/img/heart-unlocked.svg'} alt="unlocked" />
			</div>
			<img width={133} height={112} src={imageUrl} alt="sneakers" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
					<img className={styles.plus} onClick={onClickPlus} src={ isAdded ?`/img/btn-checked.svg`: `/img/btn-plus.svg`} alt="Plus" />
			</div>
		</div>
	)
}

export default Card;