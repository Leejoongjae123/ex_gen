//App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import {authService} from './firebase'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
function App() {
  const [init,setInit]=useState(false)
  const [isLoggedIn, setIsLoggedIn]=useState(authService.currentUser)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
    setIsLoggedIn(true);
    const uid = user.uid;
    console.log(uid)
    } else {
    setIsLoggedIn(false);
    }
    setInit(true);
    });
    }, []);  

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {!isLoggedIn?(
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />  
            </>
          ):(
            <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />  
          </>
          )
          }
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App