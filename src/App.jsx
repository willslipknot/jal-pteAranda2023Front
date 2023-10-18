import RegistroUsers from '../src/pages/registroUsers.jsx'
import Votar from './pages/Votar.jsx';
import Resultados from './pages/Resultados.jsx';
import LoginAdmin from './pages/loginAdmin.jsx';
import Admin from './pages/admin.jsx';
import { UserProvider } from '../src/context/user.context.jsx';
import { CandidatosProvider } from './context/candidatoContext.jsx';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (

    <Router>
      <UserProvider>
        <CandidatosProvider>
        <Routes>
          <Route path="/" element={<RegistroUsers />} />
          <Route path="/Resultados" element={<Resultados/>} />
          <Route path="/loginAdmin" element={<LoginAdmin/>} />

          <Route element={<ProtectedRoute />}>
          <Route path="/Votar" element={<Votar/>} />
          <Route path="/admin" element={<Admin/>} />
          </Route>
        </Routes>
        </CandidatosProvider>
      </UserProvider>
    </Router>
    
  );
}

export default App
