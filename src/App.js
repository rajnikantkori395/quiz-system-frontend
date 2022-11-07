
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Panel } from './components/admin/Panel';
import { Card } from './components/login/Card';
import { Navbar } from './components/Navbar';
import { CardRegister } from './components/register/CardRegister';
import { Profile } from './components/student/Profile';
import { Score } from './components/student/Score';

function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <Navbar />
        <Routes>
          <Route path='/' element={token == null ? <CardRegister /> : <Profile setToken={setToken} />} />
          <Route path='/login' element={<Card setToken={setToken} />} />
          <Route path='/score' element={token == null ? <CardRegister /> : <Score setToken={setToken} />} />
          <Route path='/profile' element={token == null ? <CardRegister /> : <Profile setToken={setToken} />} />
          <Route path='/admin/panel' element={token == null ? <CardRegister /> : <Panel setToken={setToken} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
