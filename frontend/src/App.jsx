import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Routes/homepage/HomePage';
import Login from './Routes/login/Login';
import Register from './Routes/register/Register';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
