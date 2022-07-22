import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./layout/Admin";
import Client from "./layout/Client";
import Laptop from "./screens/admin/laptop/laptop";
import AddPhone from "./screens/admin/phone/add";
import EditPhone from "./screens/admin/phone/edit";
import Phone from "./screens/admin/phone/phone";
import Sound from "./screens/admin/sound/sound";
import Tablet from "./screens/admin/tablet/tablet";
import User from "./screens/admin/user/user";
import HomePage from "./screens/website/home/homePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Client />}>
        <Route path="/" element={<HomePage />}/>
      </Route>

      <Route path="admin" element={<Admin />}>
        <Route path="phone" element={<Phone />} />
        <Route path="phone-edit/:slug" element={<EditPhone />} />
        <Route path="phone-add" element={<AddPhone />} />
        <Route path="laptop" element={<Laptop />} />
        <Route path="tablet" element={<Tablet />} />
        <Route path="sound" element={<Sound />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default App;
