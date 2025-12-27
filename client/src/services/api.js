const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

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
  }
};

export default api;
