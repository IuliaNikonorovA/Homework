import { Link } from "react-router-dom";
import logoImg from "./images/logo.png";

const Logo = () => <Link className="logo" to="/">
    <img src={logoImg} alt="Happy Dog" />
    <span>Happy Dog</span>
    </Link>

export default Logo;