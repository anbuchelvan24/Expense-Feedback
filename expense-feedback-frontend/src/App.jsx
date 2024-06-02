import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import NotFound from './NotFound/NotFound';
// import Navbar from './Navbar/Navbar';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './Register/RegisterForm';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import { AuthProvider } from './service/AuthContext';
import ProtectedRoute from './service/ProtectedRoute';
import Viewer from './pdf/Viewer';
import Landing from './LandingPage/Landing';
import History from './History/History';

function App() {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="home" />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/policies" element={<Viewer/>}/>
          <Route path="/home" element={<Landing/>}/>
          {isAuthenticated ? (
            <><Route path="/portal" element={<ExpenseForm />} />
            </>
            ) : (
              <Route path="/login" element={<LoginForm/>}/>
          )}
          <Route path={isAuthenticated ? './portal' : './login'} element={isAuthenticated ? <ExpenseForm /> : <LoginForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/History" element= {<History />} />
        </Routes>

    </BrowserRouter>
  );
}

export default App;
