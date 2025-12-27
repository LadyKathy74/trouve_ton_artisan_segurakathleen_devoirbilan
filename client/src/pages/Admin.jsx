import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Admin.scss';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulation d'authentification simple
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Identifiant ou mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="admin-page">
      <Header />
      <main className="admin-content container" id="main">
        <h1>Espace Administrateur</h1>

        {!isAuthenticated ? (
          <section className="login-section">
            <h2>Connexion</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Identifiant</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ex: admin"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ex: admin"
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="btn btn--primary">Se connecter</button>
            </form>
          </section>
        ) : (
          <section className="dashboard-section">
            <div className="dashboard-header">
              <h2>Tableau de bord</h2>
              <button className="btn btn--secondary" onClick={handleLogout}>Déconnexion</button>
            </div>
            <p>Bienvenue dans l'interface de gestion du site "Trouve ton artisan".</p>
            
            {/* Ici, vous pourrez ajouter la liste des artisans, les messages, etc. */}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;