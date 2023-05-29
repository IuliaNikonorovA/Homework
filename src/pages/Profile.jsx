import {useEffect, useState} from "react";
import {Trash3Fill} from "react-bootstrap-icons"
import {useNavigate, Link} from "react-router-dom";
import {Button, Col, Tab, Tabs, Table, Container, Row, Card, Modal, Form} from "react-bootstrap"


const Profile = ({user, setUser, goods}) => {
	const [product, setProduct] =useState([]);
	const navigate = useNavigate();
	const [review, setReview]= useState([]);
	const logOut = () => {setUser("");localStorage.removeItem("user12");navigate("/");}
	const [show, setShow] = useState(false);

	const handleClose = () => {setShow(false)};
    const handleShow  = (id) => {setShow(true); setId(id._id); setName(id.name); setLink(id.pictures); setPrice(id.price); setStock(id.stock);setDescription(id.description); setDiscount(id.discount); setWight(id.wight); setTags(id.tags)};
    const [name, setName] = useState();
    const [link, setLink] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState(); 
    const [description, setDescription] = useState();
    const [discount, setDiscount] = useState();
    const [wight, setWight] = useState();
    const [tags, setTags] = useState(); 
    const [id, setId] = useState();

	
	 useEffect(()=>{
        fetch("https://api.react-learning.ru/products", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user12-token")}`
            },
        }).then(res=>res.json())
		  .then(data => {setProduct(data.products)})
		//  .then(console.log(product));
		 
},[setProduct])

useEffect(()=>{
        fetch("https://api.react-learning.ru/products/review", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user12-token")}`
            },
        }).then(res=>res.json())
		  .then(data => setReview(data))
		//  console.log(review);
	},[review])

function DelReview(product, id)  {
	fetch(`https://api.react-learning.ru/products/review/${product}/${id}`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("user12-token")}`},
				}).then(res=>res.json())
				     .then(data=>console.log(data))
					 .then(review.filter((el)=>el.product !== product) )
					 .then(setReview(review))
	
	}
	const formHandler = (e) => {
		e.preventDefault();
	   console.log(id)
	   const body = {
		   name: name,
		   price: price,
		   discount: discount,
		   stock: stock,
		   wight: wight,
		   description: description,
		   pictures: link,
		   tags: tags
	   };
	   console.log(body);
	   fetch(`https://api.react-learning.ru/products/${id}`, {
		   method: "PATCH",
		   headers: {
			   "Content-Type": "application/json",
			   "Authorization": `Bearer ${localStorage.getItem("user12-token")}`
		   },
		   body: JSON.stringify(body)
	   })
		   .then(res => res.json())
		   .then(data => {
			   console.log(data);
			   if (!data.err && !data.error) {
				   navigate(`/product/${data._id}`
				   )
			   }
		   })
   }

    
	const DeleteProduct=(id)=>{
        // console.log(id)
        fetch(`https://api.react-learning.ru/products/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user12-token")}`
            },
        }).then(res=>res.json)
        .then(navigate("/catalog"))
		// .then(setProduct(product.filter((el)=>el._id !== product._id)))
    }


	return <>
		<h1>Личный кабинет</h1>
		<p>Привет, {user}!</p>
		
		{user && <Button variant="outline-danger" size="sm" onClick={logOut}>Выйти из аккаунта</Button>}
		{!user && <Button as={Link} to="/">Войти</Button>}

		
		<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
		  <Tab eventKey="Избранное" title="Избранное">
	  	</Tab>
	
		<Tab eventKey="Мои товары" title="Мои товары">

		{/* <Button variant="warning" as={Link} to="/my/products">Изменить</Button> */}
		<Button variant="info" as={Link} to="/add/product">Добавить</Button>

		<Container className="d-block">
		    <Row className="g-4 p-1" >
			<Col xs={12}>
				<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Мои товары</h1>
 			</Col> 
			 {
			 product.map((el,i)=> el.author._id === localStorage.getItem("user12-id") &&
				  <Col key={i} xs={12} sm={6} md={4} lg={3}>
		    	<Card style={{width: "15rem"}}>
				<Card.Img variant="top" src={el.pictures}/>
				<Card.Body>
				<Card.Title>{el.name}</Card.Title>
				<Card.Text>{el.text}</Card.Text>
				</Card.Body>
				<Button className="m-2" as={Link} to={`/product/${el._id}`}>Страница товара</Button> 
                <Button className="m-2" id={el._id} variant="primary" onClick={()=>handleShow(el)}>Изменить </Button>
                <Button className="m-2" onClick={()=>{DeleteProduct(el._id)}} >Удалить </Button>

				</Card>
				 </Col>
			 
		)}
		                     <Modal show={show} onHide={handleClose}  className= "lg w-100 vh-100">
        <Modal.Header closeButton>
          <Modal.Title>
           ID товара:  {id}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={formHandler}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-5">
                            <Form.Label htmlFor="pro-name">Название товара</Form.Label>
                            <Form.Control 
                                id="pro-name" 
                                type="text" 
                                value={name} 
                                onChange={e => {setName(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-img">Ссылка на изображение</Form.Label>
                            <Form.Control 
                                id="pro-img" 
                                type="url" 
                                value={link}
                                onChange={e => {setLink(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-price">Цена товара</Form.Label>
                            <Form.Control 
                                id="pro-price" 
                                type="number" 
                                value={price} 
                                min="10"
                                max="29999"
                                onChange={e => {setPrice(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-cnt">Количество на складе</Form.Label>
                            <Form.Control 
                                id="pro-cnt" 
                                type="number" 
                                value={stock}
                                min="0"
                                max="10000"
                                onChange={e => {setStock(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-w">Вес товара</Form.Label>
                            <Form.Control 
                                id="pro-w" 
                                type="text" 
                                value={wight}
                                onChange={e => {setWight(e.target.value)}}
                            />
                            <Form.Text>Не забудьте прописать единицу измерения вместе с весом</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-disc">Скидка</Form.Label>
                            <Form.Select 
                                id="pro-disc"
                                type="text"
                             
                                defaultValue={discount}
                                onChange={e => {setDiscount(e.target.value)}}
                            >
                                <option value={0}>Без скидки</option>
                                <option value={5}>5 %</option>
                                <option value={10}>10 %</option>
                                <option value={15}>15 %</option>
                                <option value={20}>20 %</option>
                                <option value={25}>25 %</option>
                                <option value={45}>45 %</option>
                                <option value={60}>60 %</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-info">Описание</Form.Label>
                            <Form.Control 
                                id="pro-info" 
                                type="text" 
                               value={description}
                                as="textarea"
                                rows={4}
                                onChange={e => {setDescription(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-tag">Теги</Form.Label>
                            <Form.Control 
                                id="pro-tag" 
                                type="text" 
                                value={tags}
                                onChange={e => {setTags(e.target.value)}}
                            />
                        </Form.Group>
                        <Button type="submit" id={id}>Сохранить</Button>
                    </Col>
                </Row>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          
        </Modal.Footer>
      </Modal>     

		  </Row>
	</Container>
	</Tab>
		 <Tab eventKey="Мои отзывы" title="Мои отзывы">
			{/* <Button onClick={GetReview}>Получить мои отзывы</Button> */}
		 <Table striped bordered hover size="sm">
			<thead>
				<tr>
					<th>id</th>
					<th>***</th>
					<th>text</th>
				</tr>
			</thead>
			{review.map((el,i)=> el.author._id === localStorage.getItem("user12-id") &&
			<tbody key={i}>
				<tr>
				    <td><Link to={`/product/${el.product}`}>{el.product}</Link></td>
					<td>{el.rating}</td>
					<td>{el.text}</td>
					<td><Button value={el.product} id={el._id} onClick={()=>DelReview(el.product,el._id)}><Trash3Fill/></Button></td>
				</tr>
			</tbody>)}
		 </Table>
		 </Tab> 
		 </Tabs>



	</>
}
export default Profile;