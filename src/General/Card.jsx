import {useState} from "react";
import {Link} from "react-router-dom";
import {SuitHeart, SuitHeartFill} from "react-bootstrap-icons"

const Card = ({
    likes,
    name,
    pictures,
    price,
    _id, 
    user,
    setBaseData
}) => {
    const [isLike, setIsLike] = useState(likes.includes(user));

    const likeHandler = () => {
        setIsLike(!isLike);
        setBaseData((old) => old.map(el => {
            if (el._id === _id) {
                isLike 
                ? el.likes = el.likes.filter(lk => lk !== user)
                : el.likes.push(user);
            }
            return el;
        }))
    }
    return <div className="card-lite" id={"pro_" + _id}>
        <span className="card-like" onClick={likeHandler}>
            {isLike ? <SuitHeartFill/> : <SuitHeart/>}
        </span>
        <img src={pictures} alt={name}/>
        <h4>{price} ₽</h4>
        <p>{name}</p>
        <button>Купить</button>
        <Link to={`/product/${_id}`} className="card-link"></Link>
    </div>
}

export default Card;