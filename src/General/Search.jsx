import { useContext } from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Ctx from "../ctx";

const Search = () => {
	const {baseData, setGoods, setSearchResult}= useContext(Ctx)
	const navigate = useNavigate();
	const [text, setText] = useState("");
	const [num, setNum] = useState(0);
	const changeValue = (e) => {
		navigate("/catalog")
		let val = e.target.value.toLowerCase();
		setText(val);
	}

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
		let result = baseData.filter(el => el.name.toLowerCase().includes(text));
		setGoods(result);
		setNum(result.length);
	}, [text]);
	return <>
		<input className="search" type="search" value={text} placeholder="Я ищу..." onChange={changeValue}/>
	</>
}

export default Search;