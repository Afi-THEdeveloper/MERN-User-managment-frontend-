import './App.css';
import Login from './Components/Login/Login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './Components/Register/Register';
import Home from './Components/Home';
import AdminLogin from './Components/Admin/AdminLogin';
import Dashboard from './Components/Admin/Dashboard';
import EditUser from './Components/Admin/EditUser';
import EditProfile from './Components/EditProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/adminLogin' element={<AdminLogin/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/editUser' element={<EditUser/>} />
          <Route path='/editProfile' element={<EditProfile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
