import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {Header, Footer, Banner, AdBlock} from "./General";
import Modal from "./General/Modal";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product"

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("user12-token"));
  const [baseData, setBaseData] = useState([]);
  const [goods, setGoods] = useState(baseData);
  const [searchResult, setSearchResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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


useEffect(() => {
  if (token) {
      fetch("https://api.react-learning.ru/products", {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })
          .then(res => res.json())
          .then(data => {
              setBaseData(data.products);
          })
  }
}, [token])

 useEffect(() => {
  setGoods(baseData)
}, [baseData])

    return  <>
            <Header
               user={user} 
               upd={setUser} 
               searchArr={baseData}
               setGoods={setGoods} 
               setSearchResult={setSearchResult}
               setModalOpen={setModalOpen}
           />
                <Banner/>   
                <main>
                  <Routes>
                  <Route path="/" element={<Home user={user} setActive={setModalOpen}/>}/>
                  <Route path="/catalog" element={
                        <Catalog 
                             goods={goods}
                             setBaseData={setBaseData}
                             userId={userId}
                        />
                    }/>
                  <Route path="/profile" element={
                        <Profile user={user} setUser={setUser}/>}
                    />
            <Route path="/product/:id" element={<Product />}/>
                  </Routes>
                </main>
            <AdBlock/>       
            <Footer/>
            <Modal 
                isActive={modalOpen} 
                setIsActive={setModalOpen}
                setUser={setUser}
            />
             
  </>
}

export default App;