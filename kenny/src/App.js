import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Success from './pages/Success'
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";

function App() {

  const user = true;
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products/:category' element={<ProductList/>} />
        <Route path='/product/:id' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/success' element={<Success/>} />
        {user ? <Route path='/' element={<Home/>}/> : <Route path=
        '/login' element={<Login/>} />}
        <Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
