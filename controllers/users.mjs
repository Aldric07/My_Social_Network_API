import UserModel from '../models/user.mjs';

const Users = class Users {
  constructor(app, connect) {
  this.app = app;
  this.UserModel = UserModel; // Utilise directement ton modèle importé
  this.run();
}


  // ➕ Créer un utilisateur
  create() {
    this.app.post('/user', async (req, res) => {
      try {
        const { name, email, avatar } = req.body;

        // Vérifie si l'email existe déjà
        const existingUser = await this.UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        // Création de l’utilisateur
        const user = new this.UserModel({ name, email, avatar });
        const savedUser = await user.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès', user: savedUser });
      } catch (err) {
        console.error(`[ERROR] POST /user -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  // 📋 Récupérer tous les utilisateurs
  listAll() {
    this.app.get('/users', async (req, res) => {
      try {
        const users = await this.UserModel.find();
        res.status(200).json(users);
      } catch (err) {
        console.error(`[ERROR] GET /users -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  // 📘 Récupérer un utilisateur par ID
  showById() {
    this.app.get('/user/:id', async (req, res) => {
      try {
        const user = await this.UserModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json(user);
      } catch (err) {
        console.error(`[ERROR] GET /user/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  // ❌ Supprimer un utilisateur par ID
  deleteById() {
    this.app.delete('/user/:id', async (req, res) => {
      try {
        const deleted = await this.UserModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /user/:id -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  // Lancement de toutes les routes
  run() {
    this.create();
    this.listAll();
    this.showById();
    this.deleteById();
  }
};

export default Users;
