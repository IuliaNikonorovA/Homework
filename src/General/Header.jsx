import { Link } from "react-router-dom";
import Logo from "./Logo.jsx"
import Search from "./Search.jsx";
import Ctx from "../ctx.jsx";
import { useContext } from "react";
import {Cart4, BalloonHeart, PersonCircle, Col } from "react-bootstrap-icons";


const Header =()=> {
    const {user, searchArr, setGoods, setSearchResult, basket} = useContext(Ctx);

    return <header>
        <Logo/>
     {user && <div className="search-block">
            <Search 
                data={searchArr} 
                setGoods={setGoods} 
                setSearchResult={setSearchResult}
            /></div>}
        <nav className="header__menu">
                <Link to="/favorites"><BalloonHeart title="Избранное" className="mx-2"/></Link>
                <Link to="/basket" className="position-relative"><Cart4  title="Корзина" />
                {basket.length > 0  && <span className="fst-italic badge text-bg-primary position-absolute top-0 start-100 translate-middle rounded-pill bg-danger">{basket.reduce((acc, el)=> acc + el.cnt, 0)}</span>}
                </Link>
          {user &&  <Link to="/profile"><PersonCircle  title="Личный кабинет" className="mx-2"/></Link>}

        
        </nav>
  </header>
}

export default Header;