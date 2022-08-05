import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./layout/Admin";
import Client from "./layout/Client";
import CartAdmin from "./screens/admin/cart/cartAdmin";
import CartDetail from "./screens/admin/cart/cartDetail";
import CategoryAdd from "./screens/admin/category/cateAdd";
import CategoryEdit from "./screens/admin/category/cateEdit";
import Category from "./screens/admin/category/category";
import Laptop from "./screens/admin/laptop/laptop";
import AddPhone from "./screens/admin/phone/add";
import EditPhone from "./screens/admin/phone/edit";
import Phone from "./screens/admin/phone/phone";
import Sound from "./screens/admin/sound/sound";
import Tablet from "./screens/admin/tablet/tablet";
import User from "./screens/admin/user/user";
import Login from "./screens/website/auth/login";
import Signup from "./screens/website/auth/signup";
import CartPage from "./screens/website/cart/cartPage";
import OrderPage from "./screens/website/cart/orderPage";
import CategoryPage from "./screens/website/category/categoryPage";
import HomePage from "./screens/website/home/homePage";
import ProductPage from "./screens/website/product/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Client />}>
        <Route path="/" element={<HomePage />}/>
        <Route path="/:slug" element={<CategoryPage />}/>
        <Route path="/:cate/:slug" element={<ProductPage />}/>
        <Route path="cart" element={<CartPage />} />
        <Route path="order" element={<OrderPage />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="admin" element={<Admin />}>
        <Route path="phone" element={<Phone />} />
        <Route path="cart" element={<CartAdmin />} />
        <Route path="cart/:id" element={<CartDetail />} />
        <Route path="phone-edit/:slug" element={<EditPhone />} />
        <Route path="phone-add" element={<AddPhone />} />
        <Route path="laptop" element={<Laptop />} />
        <Route path="category" element={<Category />} />
        <Route path="category-add" element={<CategoryAdd />} />
        <Route path="category-edit/:slug" element={<CategoryEdit />} />
        <Route path="tablet" element={<Tablet />} />
        <Route path="sound" element={<Sound />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default App;
