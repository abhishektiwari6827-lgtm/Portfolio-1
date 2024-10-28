import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
import App from './App';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certifications from './components/Certifications';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);