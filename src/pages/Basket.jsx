import { useState, useContext, useEffect, Fragment } from "react";
import { Button, Container, Table, ButtonGroup} from "react-bootstrap";
import {Trash3 } from "react-bootstrap-icons";
import Ctx from "../ctx";
import {Link} from "react-router-dom";


const Basket =({}) => {
    const {basket, setBasket, baseData} = useContext(Ctx);
    const ids = basket.map(b => b.id);
    const filteredData = baseData.filter(el => ids.includes(el._id));

    const sum = basket.reduce((acc, el) => acc + el.price * el.cnt, 0);
    const sumDiscount = basket.reduce((acc, el) => {
        return acc + (el.price * el.cnt * ((100 - el.discount) / 100));
    }, 0);
   
    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if(el.id === id){
                el.cnt++
            }
            return el;
        }))
    }
    const dec = (id) => {
        setBasket(prev => prev.map(el => {
            if(el.id === id){
                el.cnt--
            }
            return el;
        }))

    }
    const del = (id) => {
        setBasket(prev => prev.filter(el => el.id !== id))
    }
  
    return <Container>
        <h1>Корзина</h1>
        <Table>
            <tbody className="align-middle">
                {basket.map(el => <tr key={el.id}>
                    {filteredData.filter(f => f._id === el.id)
                    .map(d => <Fragment key={d.id}>
                    <td><img src={d.pictures} alt={d.name} height="38px"/></td>
                    <td><Link to={`/product/${el.id}`}> {d.name}</Link> </td>
                    </Fragment>)}
                    <td>
                        <ButtonGroup>
                            <Button key="plus" variant="warning" disabled={el.cnt === 1} onClick={() => dec(el.id)}>-</Button>
                            <Button key="cnt" variant="light" disabled>{el.cnt}</Button>
                            <Button key="min" variant="warning" onClick={()=> inc(el.id)}>+</Button>
                        </ButtonGroup>
                    </td>
                    <td><Trash3 onClick={() => del(el.id)} style={{cursor: "pointer"}}/></td>
                    <td>{el.price} руб</td>
                    <td className="text-danger">{el.discount > 0 
                    ? <>
                   <span>{Math.ceil(el.price*el.cnt*((100 - el.discount)/100))*el.cnt} руб</span>
                       <del className="ms-2 small text-secondary d-inline-block">{el.price * el.cnt} руб</del>
                       </>
                    : <span>{el.price * el.cnt} руб</span>}
                    </td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={5} className="text-end text-uppercase">Общая сумма:</td>
                    <td className="fs-5 fw-bold">{sumDiscount === sum
                        ? <span>{sum} ₽</span>
                        : <>
                            <span className="text-danger">{Math.ceil(sumDiscount)} ₽</span>
                            <del className="ms-2 small text-secondary d-inline-block">{sum} ₽</del>
                        </>
                    }</td>
                    {/* Посчитать сумму всех товаров с учетом их количества */}
                    {/* Посчитать сумму всех товаров с учетом их количества и скидки*/}
                </tr>
            </tfoot>
        </Table>
    </Container>
}

export default Basket;