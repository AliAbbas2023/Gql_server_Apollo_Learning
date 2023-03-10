import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/Login.js'
import Register from './Pages/Register/Register';
import {Routes,Route} from "react-router-dom"
import HomePage from './Pages/HomePage/HomePage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
