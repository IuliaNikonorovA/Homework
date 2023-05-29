
import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {SuitHeart, SuitHeartFill} from "react-bootstrap-icons"
import {Card, Button} from "react-bootstrap"
import Ctx from "../ctx";

const BsCard = ({
    discount,

    likes,
    name,
    pictures,
    price,

    tags,
    _id, 
    user,
    // setBaseData
}) => {
    const {setBaseData} = useContext(Ctx)

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

