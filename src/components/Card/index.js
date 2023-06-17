import styles from './Card.module.scss'


const Card = (props) => {

	const onClickButton = () => {
		{alert("Add")}
	}
	return (
		<div className={styles.card}>
						<div className={styles.favorite}>
							<img src="/img/heart-unlocked.svg" alt="unlocked" />
							</div>
						<img width={133} height={112} src={props.imageUrl}alt="sneakers" />
						<h5>{props.title}</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column">
								<span>Цена:</span>
								<b>{props.price} руб.</b>
							</div>
							<button onClick={onClickButton} className="button">
								<img  width={11} height={11} src="/img/add.svg" alt="Plus" />
							</button>
						</div>
					</div>
	)
}

export default Card;