import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
//import "./style.css";

const Search = ({data, setGoods, setSearchResult}) => {
	const navigate = useNavigate();
	const [text, setText] = useState("");
	const [num, setNum] = useState(0);
	const changeValue = (e) => {
		navigate("/catalog")
		let val = e.target.value.toLowerCase();
		setText(val);
	}
<<<<<<< HEAD
=======
	// const changeText = () => {
	// 	console.log("Click")
	// 	setText("Привет!");
	// }
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
	useEffect(() => {
		let str = '';
		if (num && text) {
			str = `По запросу ${text} найдено ${num} товаров`;
		} else if (text) {
			str = `По запросу ${text} не найдено ни одного товара`;
		} else {
			str = '';
		}
		setSearchResult(str);
	}, [num, text]);
	useEffect(() => {
		let result = data.filter(el => el.name.toLowerCase().includes(text));
		setGoods(result);
		setNum(result.length);
	}, [text]);
	return <>
		<input className="search" type="search" value={text} placeholder="Я ищу..." onChange={changeValue}/>
	</>
}

export default Search;