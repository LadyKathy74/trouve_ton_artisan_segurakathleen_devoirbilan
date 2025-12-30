const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3006";

const api = {
  /**
   * Récupère la liste de tous les artisans
   */
  getArtisans: async () => {
    try {
      const response = await fetch(`${API_URL}/api/artisans`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur dans getArtisans:", error);
      throw error;
    }
  },

  /**
   * Récupère un artisan spécifique par son ID
   * @param {string|number} id
   */
  getArtisanById: async (id) => {
    if (!id) throw new Error("L'ID est requis pour getArtisanById");
    try {
      const response = await fetch(`${API_URL}/api/artisans/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erreur dans getArtisanById (${id}):`, error);
      throw error;
    }
  },

  /**
   * Récupère les artisans filtrés par catégorie
   * @param {string|number} categoryId
   */
  getArtisansByCategory: async (categoryId) => {
    if (!categoryId) throw new Error("L'ID de catégorie est requis pour getArtisansByCategory");
    try {
      const response = await fetch(`${API_URL}/api/artisans/categorie/${categoryId}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erreur dans getArtisansByCategory (${categoryId}):`, error);
      throw error;
    }
  },

  /**
   * Récupère toutes les catégories
   */
  getCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Erreur dans getCategories:", error);
      throw error;
    }
  },

  /**
   * Récupère toutes les spécialités
   */
  getSpecialties: async () => {
    try {
      const response = await fetch(`${API_URL}/api/specialites`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Erreur dans getSpecialties:", error);
      throw error;
    }
  },

  /**
   * Crée un nouvel artisan
   * @param {FormData} formData 
   */
  createArtisan: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/artisans`, {
        method: 'POST',
        body: formData, // Pas de 'Content-Type' avec FormData, le navigateur le gère
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erreur lors de la création de l\'artisan');
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur dans createArtisan:", error);
      throw error;
    }
  },

  /**
   * Met à jour un artisan
   * @param {string|number} id 
   * @param {FormData} formData 
   */
  updateArtisan: async (id, formData) => {
    try {
      const response = await fetch(`${API_URL}/api/artisans/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'artisan');
      return await response.json();
    } catch (error) {
      console.error(`Erreur dans updateArtisan (${id}):`, error);
      throw error;
    }
  },

  /**
   * Supprime un artisan
   * @param {string|number} id 
   */
  deleteArtisan: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/artisans/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression de l\'artisan');
      return await response.json();
    } catch (error) {
      console.error(`Erreur dans deleteArtisan (${id}):`, error);
      throw error;
    }
  },
};

export default api;
