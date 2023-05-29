<<<<<<< HEAD
import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {SuitHeart, SuitHeartFill} from "react-bootstrap-icons"
import {Card, Button} from "react-bootstrap"
import Ctx from "../ctx";

const BsCard = ({
    discount,
=======
import {useState} from "react";
import {Link} from "react-router-dom";
import {SuitHeart, SuitHeartFill} from "react-bootstrap-icons"

const Card = ({
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
    likes,
    name,
    pictures,
    price,
<<<<<<< HEAD
    tags,
    _id, 
    user,
    // setBaseData
}) => {
    const {setBaseData} = useContext(Ctx)
=======
    _id, 
    user,
    setBaseData
}) => {
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
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
<<<<<<< HEAD
    return <Card className="pt-3 h-100" id={"pro_" + _id}>
        {user && <span className="card-like" onClick={likeHandler}>
            {isLike ? <SuitHeartFill/> : <SuitHeart/>}
        </span>}
        <Card.Img variant="top" src={pictures} alt={name} className="align-self-center w-auto" height="100"/>
        <Card.Body className="d-flex flex-column">
        <Card.Title as="h4">{price} ₽</Card.Title>
        <Card.Text className="text-secondary fs-5 flex-grow-1">{name}</Card.Text>
       {user && <Button variant="warning" className="w-100">Купить</Button>}
        </Card.Body>
        {user && <Link to={`/product/${_id}`} className="card-link"></Link>}
    </Card>
}

export default BsCard;
=======
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
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
