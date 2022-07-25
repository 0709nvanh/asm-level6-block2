import { combineReducers } from "redux";
import userSlice from "../features/userSlide";
import productSlide from "../features/productSlide";
import categorySlide from "../features/categorySlide";
const rootReducer = combineReducers({
  users: userSlice,
  products: productSlide,
  categories: categorySlide
});
export default rootReducer;
