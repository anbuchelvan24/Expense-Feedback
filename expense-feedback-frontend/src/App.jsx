import { BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './NotFound/NotFound';
import Navbar from './Navbar/Navbar';
import LoginForm from './LoginForm/LoginForm'; // Assuming you have a Login component
import RegisterForm from './Register/RegisterForm'; // Assuming you have a Register component
import Portal from './UploadPortal/UploadPortal'; // Assuming you have a Portal component
import ExpenseForm from './ExpenseForm/ExpenseForm'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path='/' element={<LoginForm />} />
          <Route path='login' element={<LoginForm />} />
          <Route path="register" element={<RegisterForm/>} />
          <Route path="/portal" element={
            <>
              <Navbar />
              <ExpenseForm />
            </>
          }/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
