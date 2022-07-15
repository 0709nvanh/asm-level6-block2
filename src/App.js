import './App.css';
import { Routes, Router } from 'react-router-dom'
import Client from './layout/Client';
import Admin from './layout/Admin';

function App() {
  return (
    <Routes>
      <Router path="/" element={<Client/>}>
      </Router>

      <Router path="admin" element={<Admin />}>
      </Router>
    </Routes>
  );
}

export default App;
