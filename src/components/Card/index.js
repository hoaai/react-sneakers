import styles from './Card.module.scss'
import {useEffect, useState} from 'react'


const Card = ({imageUrl,title,price,onPlus,onFavorite}) => {

	const onClickButton = () => {
		{ alert("Add") }
	}

	const [isAdded,setIsAdded]=useState(false);
	const [isLiked,setIsLiked]=useState(false)

	const onClickPlus = () => {
		onPlus({imageUrl,title,price})
		setIsAdded(!isAdded);
	}

	const onClickFavorite = () => {
		setIsLiked(!isLiked);
	}

	return (
		<div className={styles.card}>
			<div onClick={onFavorite} className={styles.favorite}>
				<img src={isLiked? '/img/heart-locked.svg': '/img/heart-unlocked.svg'} alt="unlocked" />
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