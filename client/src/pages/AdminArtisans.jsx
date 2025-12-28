import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AdminArtisans.scss';

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:3006").replace(/\/$/, "");

export default function AdminArtisans() {
    // --- ÉTATS D'AUTHENTIFICATION ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // --- ÉTATS CRUD ---
    const [artisans, setArtisans] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        location: '',
        rating: '',
        description: '',
        email: '',
        website: '',
        category: '',
        image: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        // On ne charge les données que si on est connecté
        if (isAuthenticated) {
            fetchArtisans();
        }
    }, [isAuthenticated]);

    // --- GESTION DE LA CONNEXION ---
    const handleLogin = (e) => {
        e.preventDefault();
        // 🔒 MOT DE PASSE SIMPLE (À changer ici)
        if (password === "admin123") {
            setIsAuthenticated(true);
            setPassword(''); // On vide le champ
        } else {
            alert("Mot de passe incorrect");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setArtisans([]); // On vide les données par sécurité
    };

    // --- LOGIQUE CRUD ---
    const fetchArtisans = async () => {
        try {
            const res = await fetch(`${API_URL}/api/artisans`);
            const data = await res.json();
            setArtisans(data.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error("Erreur lors du chargement des artisans:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `${API_URL}/api/artisans/${editId}` : `${API_URL}/api/artisans`;
            
            const data = new FormData();
            // Ajout des champs texte
            for (const key in formData) {
                if (key !== 'image') {
                    data.append(key, formData[key]);
                }
            }
            // Ajout du fichier ou de l'ancien nom d'image
            if (selectedFile) {
                data.append('image', selectedFile);
            } else if (formData.image) {
                data.append('image', formData.image);
            }

            const res = await fetch(url, { method, body: data });

            if (res.ok) {
                fetchArtisans();
                resetForm();
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const handleEdit = (artisan) => {
        setFormData({
            name: artisan.name || '',
            specialty: artisan.specialty || '',
            location: artisan.location || '',
            rating: artisan.rating || '',
            description: artisan.description || '',
            email: artisan.email || '',
            website: artisan.website || '',
            category: artisan.category || '',
            image: artisan.image || ''
        });
        setSelectedFile(null);
        setIsEditing(true);
        setEditId(artisan.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet artisan ?")) {
            try {
                const res = await fetch(`${API_URL}/api/artisans/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchArtisans();
                } else {
                    alert("Erreur lors de la suppression");
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            specialty: '',
            location: '',
            rating: '',
            description: '',
            email: '',
            website: '',
            category: '',
            image: ''
        });
        setSelectedFile(null);
        setIsEditing(false);
        setEditId(null);
    };

    // --- RENDU : ÉCRAN DE CONNEXION ---
    if (!isAuthenticated) {
        return (
            <div className="admin-page">
                <Header />
                <main className="container admin-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                    <h1>Accès Administrateur</h1>
                    <section className="admin-form-section" style={{ maxWidth: '400px', width: '100%' }}>
                        <form onSubmit={handleLogin} className="admin-form">
                            <div className="form-group">
                                <label>Mot de passe</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Entrez le mot de passe"
                                    autoFocus
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-submit" style={{ width: '100%' }}>Se connecter</button>
                            </div>
                        </form>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    // --- RENDU : INTERFACE D'ADMINISTRATION ---
    return (
        <div className="admin-page">
            <Header />
            <main className="container admin-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Administration des Artisans</h1>
                    <button onClick={handleLogout} className="btn-delete" style={{ padding: '0.5rem 1rem' }}>Déconnexion</button>
                </div>
                
                <section className="admin-form-section">
                    <h2>{isEditing ? 'Modifier un artisan' : 'Ajouter un artisan'}</h2>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Spécialité</label>
                                <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Catégorie</label>
                                <select name="category" value={formData.category} onChange={handleChange}>
                                    <option value="">Sélectionner...</option>
                                    <option value="Bâtiment">Bâtiment</option>
                                    <option value="Services">Services</option>
                                    <option value="Fabrication">Fabrication</option>
                                    <option value="Alimentation">Alimentation</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ville</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Note</label>
                                <input type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Site Web</label>
                            <input type="text" name="website" value={formData.website} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
                            {formData.image && <p style={{fontSize: '0.8rem', marginTop: '5px'}}>Image actuelle : {formData.image}</p>}
                        </div>
                        
                        <div className="form-actions">
                            <button type="submit" className="btn-submit">{isEditing ? 'Mettre à jour' : 'Ajouter'}</button>
                            {isEditing && <button type="button" className="btn-cancel" onClick={resetForm}>Annuler</button>}
                        </div>
                    </form>
                </section>

                <section className="admin-list-section">
                    <h2>Liste des artisans ({artisans.length})</h2>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Catégorie</th>
                                    <th>Ville</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artisans.map(artisan => (
                                    <tr key={artisan.id}>
                                        <td>{artisan.id}</td>
                                        <td>{artisan.name}</td>
                                        <td>{artisan.category}</td>
                                        <td>{artisan.location}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => handleEdit(artisan)}>Éditer</button>
                                            <button className="btn-delete" onClick={() => handleDelete(artisan.id)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
