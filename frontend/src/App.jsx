import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Routes/homepage/HomePage';
import MyPage from './Routes/mypage/MyPage';
import Login from './Routes/login/Login';
import Register from './Routes/register/Register';
import MyPageAccount from './Routes/mypageaccount/MyPageAccount';
import CountryPage from './Routes/countrypage/CountryPage';
import axios from 'axios';
import ProtectedRoutes from './services/ProtectedRoutes';
import AuthenticatedLayout from './services/AuthenticatedLayout';

//axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = process.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  
  return (
    <Router>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />  

        <Route element={<ProtectedRoutes />}>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/" element={<HomePage />} /> {/* Main homepage */}
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/mypageaccount' element={<MyPageAccount />} />
            <Route path="/country/:countryId" element={<CountryPage />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  )
}

export default App
