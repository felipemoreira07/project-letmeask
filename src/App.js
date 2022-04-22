import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthProvider from './services/AuthProvider'
import { NewRoom } from './pages/NewRoom'
import { Home } from './pages/Home'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/rooms/new" exact element={<NewRoom/>}/>
          <Route path="/rooms/:id" element={<Room/>}/>
          <Route path="/admin/rooms/:id" element={<AdminRoom/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
