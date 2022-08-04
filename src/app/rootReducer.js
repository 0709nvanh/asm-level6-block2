import { combineReducers } from "redux";
import userSlice from "../features/userSlide";
import productSlide from "../features/productSlide";
import categorySlide from "../features/categorySlide";
import cartSlide from "../features/cartSlide";
const rootReducer = combineReducers({
  users: userSlice,
  products: productSlide,
  categories: categorySlide,
  carts: cartSlide
});
export default rootReducer;
