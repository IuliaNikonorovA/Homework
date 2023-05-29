<<<<<<< HEAD
import { useContext } from "react";
import {Container, Row, Col} from "react-bootstrap";
import BsCard from "../General/Card";
import Ctx from "../ctx";


const Catalog = ({goods, setBaseData, userId}) => {
	const {searchResult} = useContext(Ctx);
	return <Container className="d-block">
		<Row className="g-4">
		{searchResult && <Col xs={12} className="search-result">
				 {searchResult}
			</Col> }
=======
import {Container, Row, Col} from "react-bootstrap";
import Card from "../General/Card";


const Catalog = ({goods, setBaseData, userId}) => {
	return <Container className="d-block">
		<Row className="g-4">
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
			<Col xs={12}>
				<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Каталог</h1>
			</Col>
			{goods.map((pro, i) => (
				<Col key={i} xs={12} sm={6} md={4} lg={3}>
<<<<<<< HEAD
					<BsCard img={pro.pictures} {...pro} setBaseData={setBaseData} user={userId}/>
=======
					<Card img={pro.pictures} {...pro} setBaseData={setBaseData} user={userId}/>
>>>>>>> 90d281bdc035b03fabb5a97d5edb3355534f11d0
				</Col>
			))}
		</Row>
	</Container>
}

export default Catalog;