import {useState, useEffect, useContext} from "react";
import {useParams, Link} from "react-router-dom";
import {Button, Card, Accordion, Alert, Form, CloseButton, Nav, Modal, ButtonGroup} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import {StarFill, Star} from "react-bootstrap-icons"
import Ctx from "../ctx";


    const Product = (user) => {
	const {basket, setBasket} = useContext(Ctx);
	
	const navigate = useNavigate();
	const {id} = useParams()
	const [data, setData] = useState({});
	const [show, setShow] = useState(false);
	const [showDel, setShowDel] = useState(false);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(false);
	// const [setbasket, setSetBasket]= useState(localStorage.getItem("basket"));
	// const desBasket=(id) => basket.filter(el => el.id === data._id);

	// console.log((setbasket.split(",", 6)))
	// console.log(basket)


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
				setData(data);
				setRating("");
				setReview("");
				setShow(false)
            })
    }	

	const addBasket = (id, pr, dis,) => {
        //  e.preventDefault();
        //  e.stopPropagation();
		setShowDel(false);
        setBasket(prev => [...prev, {
            id: id,
            price: pr,
            discount: dis,
            cnt:1
        }])
    }


	const inc = (id, stock) => {
        setBasket(prev => prev.map(el => {
            if(el.id === id){
				if(el.cnt < stock)
                el.cnt++
            }
            return el;
        }))
    }
	const dec = (id) => {
        setBasket(prev => prev.map(el => {
            if(el.id === id){
				if(el.cnt > 0)
                el.cnt--
            }if(el.cnt === 0){
				setShowDel(true)
			}
            return el;
        }))

    }
	const delcnt = (id) => {
		setBasket(prev => prev.map(el => {
            if(el.id === id){
				el.cnt = 1;
				setShowDel(false)
			}
			return el;
			}))

	}
	const delprobasket =(id) =>{
		setBasket(prev => prev.filter(el => el.id !== id))

	}
	const datastok = (id,stock) => {
		console.log(stock)
		basket.filter(el=> el.id === id).map((f=> f.cnt===stock))
	}



	return <>
		{data.name 
			?<Card className="w-50 mx-auto min-vh-100 grid text-center">
				<Nav className="p-2 grid justify-content-between">
				<Link to={`/catalog#pro_${id}`}>Каталог</Link>			
				{user && <Link  to={"/profile"} >Мои товары</Link>}
				</Nav>


				{data.discount>0 && <Card.Title className="m-2 fw-bold pe-1 border-danger text-danger text-center rounded-pill">SALE {data.discount} %</Card.Title>}
				<Card.Img className ="card-img-top w-50 rounded mx-auto d-block" src={data.pictures} alt={data.name} />
				<Card.Body className="">
				<Card.Title>{data.name}</Card.Title>
				<Card.Text>{data.description}</Card.Text>
				<Card.Text>Вес: {data.wight}</Card.Text>
				{data.discount>0 && <Card.Text> <span className="text-secondary text-decoration-line-through"> Цена: {data.price} руб</span>
				<span className="text-danger m-3">Цена: {Math.ceil(data.price-(data.price/100*data.discount))} руб</span></Card.Text>}
				 
				{!data.discount && <Card.Text className="fw-bolder text-primary">Цена: {data.price} руб</Card.Text>}
				<Card.Text>В наличии {data.stock} шт.</Card.Text>

				{basket.filter(el => el.id === data._id).length>0
				
				? <>
				<Button className="btn btn-primary m-4">В корзинe<span className="m-2">{basket.filter(el => el.id === data._id).map(f=> f.cnt)} шт.</span>
				<span className="btn btn-outline-light mx-1"  onClick={()=> inc(data._id, data.stock)}>+</span>
				<span className="btn btn-outline-light" onClick={()=> dec(data._id)}>-</span></Button>
				<Modal className="modal-dialog modal-dialog-center" show={showDel}>
					<Modal.Body>Удалить товар из корзины?</Modal.Body>
					<Nav className="p-2 grid justify-content-around"><Button onClick={()=> delprobasket(data._id)}>Да</Button><Button onClick={()=>delcnt(data._id)}>Нет</Button></Nav>
				</Modal>
				</>
					
				
				
				
				:  <Button className="btn btn-primary m-4" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); addBasket(data._id, data.price, data.discount)}}>В корзину</Button>}


				<Button className="btn btn-primary m-4" onClick={() => setShow(true)}>Добавить отзыв</Button>
				<Alert show={show}>
				
					<CloseButton type="reset" className="d-flex justify-content-start" onClick={()=>{setRating(""); setReview(""); setShow(false)}}/>
				
					<Form>
					
						<Form.Label htmlFor="inputReview">Ваш отзыв о товаре</Form.Label>
						<p>
						<span><Star className="m-1"/></span> <Star className="m-1"/><Star className="m-1"/><Star className="m-1"/><Star className="m-1"/>
						</p>
						
						<Form.Control type="text" as="textarea" rows={3} placeholder="Текст отзыва" value={review} id="inputReview" onChange={e => {setReview(e.target.value)}}/>
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
			{/* <Button className="btn btn-primary m-4" onClick={() => setShow(true)}>Добавить отзыв</Button> */}

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