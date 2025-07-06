import './assets/css/style.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-black">
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
