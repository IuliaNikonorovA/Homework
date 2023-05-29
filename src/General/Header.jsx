import { Link } from "react-router-dom";
import Logo from "./Logo.jsx"
import Search from "./Search.jsx";
<<<<<<< HEAD
import { BalloonHeart, Cart4, PersonCircle, } from "react-bootstrap-icons";
=======
import {
    BalloonHeart, 
    Cart4, 
    PersonCircle, 
} from "react-bootstrap-icons";

>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0

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
<<<<<<< HEAD
               {user && <Link to="/profile"><PersonCircle  title="Личный кабинет"/></Link>}
=======
                <Link to="/profile"><PersonCircle  title="Личный кабинет"/></Link>
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
        
        </nav>
  </header>
}

export default Header;