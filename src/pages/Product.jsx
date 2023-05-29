import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {Button, Card, Accordion, Alert, Form, Col} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import {StarFill, Star} from "react-bootstrap-icons"


    const Product = (user) => {
		
	const navigate = useNavigate();
	const {id} = useParams()
	const [data, setData] = useState({});
	const [show, setShow] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(false);


	useEffect(() => {
		fetch(`https://api.react-learning.ru/products/${id}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("user12-token")}`
			}
		})
			.then(res => res.json())
			.then(serverData => {
				setData(serverData);
			})
	}, [setData])

	const feedback = (e) => {
        e.preventDefault();
        const body = {
			text : review,
			rating: rating
		} 
        fetch(`https://api.react-learning.ru/products/review/${data._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user12-token")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err && !data.error) {
                    navigate("/catalog")
                }
            })
    }	

	return <>
		{data.name 
			? <Card className="card w-50 min-vh-100" >
				<Link to={`/catalog#pro_${id}`}>Каталог</Link> 
				{user && <Link to={"/profile"}>Мои товары</Link> }

				{data.discount>0 && <Card.Title className="w-50 m-2 p-1 bg-danger text-white text-center rounded-pill">SALE {data.discount} %</Card.Title>}
				<Card.Img className ="card-img-top w-25" src={data.pictures} alt={data.name} />
				<Card.Body className="">
				<Card.Title>{data.name}</Card.Title>
				<Card.Text>{data.description}</Card.Text>
				<Card.Text>Вес: {data.wight}</Card.Text>
				<Card.Text>Цена: {data.price} руб</Card.Text>
				{<Card.Text>В наличии {data.stock} шт.</Card.Text>}
				<Button className="btn btn-primary m-4">В корзину</Button>
				<Button className="btn btn-primary m-4" onClick={() => setShow(true)}>Добавить отзыв</Button>
				<Alert show={show}>
					<Form>
					
						<Form.Label htmlFor="inputReview">Ваш отзыв о товаре</Form.Label>
						<p>
						<span><Star className="m-1"/></span> <Star className="m-1"/><Star className="m-1"/><Star className="m-1"/><Star className="m-1"/>
						</p>
						
						<Form.Control type="text" placeholder="Текст отзыва" value={review} id="inputReview" onChange={e => {setReview(e.target.value)}}/>
						<Form.Label htmlFor="pro-rating">Рейтинг</Form.Label>
                            <Form.Select 
                                id="pro-rating"
                                type="text"
								defaultValue={5}
                                onChange={e => {setRating(e.target.value)}}
                            >
                                <option value={1}>Ужасно</option>
                                <option value={2}>Плохо</option>
                                <option value={3}>Удолетворительно</option>
                                <option value={4}>Хорошо</option>
                                <option value={5}>Отлично</option>
								</Form.Select>

						</Form><hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={feedback}>Сохранить</Button>
					</div>
				</Alert>
				<Accordion defaultActiveKey={1}>
					<Accordion.Item eventKey="1">
						<Accordion.Header>Отзывы</Accordion.Header>
						<Accordion.Body>
			{data.reviews.length>0 && data.reviews.map((el,i) => <Alert key={i}> {el.author.name}  : "{el.text}"   Рейтинг: {el.rating} {<StarFill/>}</Alert>)}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
				
				</Card.Body>

			</Card> 
			: <div className="info" style={{textAlign: "center"}}>
				Товара {id} не существует<br/>или<br/>он еще не загружен
				<Link to={`/catalog#pro_${id}`}>Назад</Link>

			</div>

		}
	</>
}

export default Product;