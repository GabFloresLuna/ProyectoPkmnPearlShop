import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap primero: nuestros estilos lo complementan y tienen prioridad
import './styles/variables.css';
import './styles/styles.css';
import './styles/overrides.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
