
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddEditBookPage from './pages/AddEditBookPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
            
            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/addbook" element={<AddEditBookPage />} />
              <Route path="/editbook/:id" element={<AddEditBookPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </main>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;