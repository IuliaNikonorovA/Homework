import { Link } from "react-router-dom";
import Logo from "./Logo.jsx"
import Search from "./Search.jsx";
import {
    BalloonHeart, 
    Cart4, 
    PersonCircle, 
} from "react-bootstrap-icons";


const Header = ({
    user, 
    upd, 
    searchArr,
    setGoods, 
    setSearchResult,
    setModalOpen
}) => {
    const login = () => {
        setModalOpen(true)
    }
    return <header>
        <Logo/>
      
      {user && <div className="search-block">
            <Search 
                data={searchArr} 
                setGoods={setGoods} 
                setSearchResult={setSearchResult}
            /></div>}
        <nav className="header__menu">
                <Link to="/"><BalloonHeart title="Избранное"/></Link>
                <Link to="/"><Cart4  title="Корзина"/></Link>
                <Link to="/profile"><PersonCircle  title="Личный кабинет"/></Link>
        
        </nav>
  </header>
}

export default Header;