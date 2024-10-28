import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91
import { store } from './store';
import App from './App';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
<<<<<<< HEAD
import Certifications from './components/Certifications';
=======
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <Router>
=======
      <Router> 
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
<<<<<<< HEAD
            <Route path="certifications" element={<Certifications />} />
=======
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
<<<<<<< HEAD
);
=======
);
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91
