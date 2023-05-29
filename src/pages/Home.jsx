import { Link } from "react-router-dom";
import { Journals } from "react-bootstrap-icons";
<<<<<<< HEAD
import Slider from "../General/Slider";

const Home = ({user, setActive}) => {
    return <>
    <div className="info">
=======

const Home = ({user, setActive}) => {
    return <div className="info">
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
    {user && <Link to= "/catalog" className="info-link">
        <Journals style={{marginRight: "10px"}}/>
        Каталог товаров
        </Link>}
    {!user && <>
    <span className="info-link" onClick={() => setActive(true)}>Авторизуйтесь</span>, 
    чтобы получить доступ к сайту</>}
    </div>
<<<<<<< HEAD
    <Slider desktop={3} mobile={2}/>
    </>
=======
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
}

export default Home;