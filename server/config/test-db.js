import sequelize from './config/database.js';

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à la base de données !');
  } catch (error) {
    console.error('❌ Impossible de se connecter :', error.message);
  } finally {
    await sequelize.close();
  }
};

testConnection();
