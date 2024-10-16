import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Routes/homepage/HomePage';
import MyPage from './Routes/mypage/MyPage';
import Login from './Routes/login/Login';
import Register from './Routes/register/Register';
import MyPageAccount from './Routes/mypageaccount/MyPageAccount';
import CountryPage from './Routes/countrypage/CountryPage';
import axios from 'axios';
import ProtectedRoutes from './services/ProtectedRoutes';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  console.log("Rendering App");
  
  return (
    <Router>
      <Routes>      
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />  

        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/" element={<HomePage />} /> {/* Main homepage */}
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/mypageaccount' element={<MyPageAccount />} />
          <Route path="/country/:countryId" element={<CountryPage />} />
        {/* </Route> */}

      </Routes>
    </Router>
  )
}

export default App
