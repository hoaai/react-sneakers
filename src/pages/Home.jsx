import Card from "../components/Card"


function Home ({items,onChangeSearchInput,searchValue,setSearchValue,onAddToCart,onAddToFavorite}) {
	return (
		<div className="content p-40">
				<div className="d-flex align-center mb-40 justify-between">
					<h1>
						{
							searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"
						}
					</h1>
					<div className="search-block">
						<img src="/img/search.svg" alt="Search" />
						{searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
						<input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
					</div>
				</div>
				<div className="d-flex flex-wrap">
					{items.filter(item => item.title.toLowerCase().includes(searchValue)).map((item, index) => {
						return (
							<Card
								key={index}
								onFavorite={(obj) => onAddToFavorite(obj)}
								onPlus={(obj) => onAddToCart(obj)}
								{...item}/>
						)
					})}
				</div>
			</div>
	)
}

export default Home;