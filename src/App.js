
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
  // const [session, setSession] = useState(10);
  // const navigate = useNavigate();

  // let timer = setInterval(() => {
  //   setSession((session) => {
  //     if (session === 0) {
  //       clearInterval(session);
  //       navigate('/login');
  //       localStorage.clear();
  //       return 0;
  //     } else return session - 1;
  //   });
  // }, 1000);

  // useEffect(() => {

  //   timer();
  // }, [token]);

  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <Navbar />
        <Routes>
          <Route path='/' element={token == null ? <CardRegister /> : <Profile />} />
          <Route path='/login' element={<Card setToken={setToken} />} />
          <Route path='/score' element={token == null ? <CardRegister /> : <Score />} />
          <Route path='/profile' element={token == null ? <CardRegister /> : <Profile />} />
          <Route path='/admin/panel' element={token == null ? <CardRegister /> : <Panel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
