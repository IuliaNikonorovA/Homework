import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import Ctx from "./ctx";
import Api from "./api";
import {Header, Footer, Banner, AdBlock} from "./General";
import Modal from "./General/Modal";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product"
import AddProduct from "./pages/AddProduct";
import Favorites from "./pages/Favorites";
import Basket from "./pages/Basket";

const App = () => {
  let basketStore = localStorage.getItem("basket");
  if (basketStore && basketStore[0] === [""]) {
    basketStore = JSON.parse(basketStore);
  }else {
    basketStore =[]
  }

  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("user12-token"));
  const [api, setApi] = useState(new Api(token));
  const [baseData, setBaseData] = useState([]);
  const [goods, setGoods] = useState(baseData);
  const [searchResult, setSearchResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    if (user) {
        setUserId(localStorage.getItem("user12-id"));
        setToken(localStorage.getItem("user12-token"));
    } else {
        localStorage.removeItem("user12-id")
        localStorage.removeItem("user12-token")
        setUserId(null);
        setToken(null);
    }
}, [user])
// console.log("user" + user)
useEffect (() => {
 localStorage.setItem("basket", JSON.stringify(basket))
}, [basket])

useEffect(() => {
    setApi((new Api(token)));
    // console.log("user12-token", token)
}, [token])


useEffect(() => {
  if (token) {
    api.getProducts()
          .then(data => {
              setBaseData(data.products);
              // console.log(baseData)
          })
  } else {
    setBaseData([])
  }
}, [api])

 useEffect(() => {
  setGoods(baseData);
  // console.log(goods)
}, [baseData])


    return (<Ctx.Provider value={{
    setUser, searchResult, setSearchResult, setBaseData, baseData, setGoods, goods, api, userId, user, basket, setBasket, basketStore}}>
            <>
            <Header/>
            <Banner/>   
            <main>
                <Routes>
                  <Route path="/" element={<Home user={user} setActive={setModalOpen}/>}/>
                  <Route path="/catalog" element={ <Catalog/> }/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/favorites" element={<Favorites/>}/>
                  {/* <Route path="/my/products" element={<Myproducts goods={goods} userId={userId} setBaseData={setBaseData}/>}/>    */}
                  <Route path="/product/:id" element={<Product/>}/>
                  <Route path="/add/product" element={<AddProduct/>}/>  
                  <Route path="/basket" element={<Basket/>}/>  

                </Routes>
            </main>
            <AdBlock/>       
            <Footer/>
            <Modal isActive={modalOpen} setIsActive={setModalOpen} setUser={setUser}/>
         </>
  </Ctx.Provider>)
}

export default App;