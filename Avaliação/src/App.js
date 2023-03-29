import { BrowserRouter as Router} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ConfigRoutes from './ConfigRoutes';

function App() {
  return (
    <Router>
      <Header />
      <ConfigRoutes />
      <Footer />
    </Router>
  );
}

export default App;
