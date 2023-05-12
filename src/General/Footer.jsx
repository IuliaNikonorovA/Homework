import { Link } from "react-router-dom";
import Logo from "./Logo";
 const links = [
    {name: "Каталог", src: "/catalog"},
    {name: "Избранное", src: "/"},
    {name: "Корзина", src: "/"},

]

const Footer = () => <footer>
    <div className="footer__copy">
        <Logo/>
    </div>
    <div className="footer__nav">
        <span>©{new Date().getFullYear()}</span>
    </div>
   
   
  {/* {user && <ul className="footer__nav">
        {links.map(el => <li key={el.name}>
            <Link to={el.src}>{el.name}</Link>
        </li>)}
    </ul>} */}
</footer>

export default Footer;