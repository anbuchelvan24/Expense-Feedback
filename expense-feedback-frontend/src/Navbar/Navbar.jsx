import './Navbar.css'
import { FaUser } from "react-icons/fa6";


const Portal = () => {
    return (
      <nav className='main-nav'>
        <ul className="menu">
            <li><FaUser color='white'/></li>
            <li><a href="/portal">Expense Feedback</a></li>   
        </ul>
      </nav>
    );
  };

export default Portal;
