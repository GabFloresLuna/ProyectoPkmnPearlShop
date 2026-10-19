import { CartProvider } from './context/CartContext';
import { AppRouter } from './AppRouter';
import './css/variables.css';
import './css/styles.css';

export const App = () => {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
};

export default App;