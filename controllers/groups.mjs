import GroupModel from '../models/group.mjs';

const Groups = class Groups {
  constructor(app) {
    this.app = app;
    this.GroupModel = GroupModel;
    this.run();
  }

  // ➕ Créer un groupe
  create() {
    this.app.post('/group', async (req, res) => {
      try {
        const { name, description, icon, coverPhoto, type, allowPosts, allowEvents, createdBy } = req.body;

        const group = new this.GroupModel({
          name,
          description,
          icon,
          coverPhoto,
          type,
          allowPosts,
          allowEvents,
          createdBy,
          members: [createdBy] // le créateur est automatiquement membre
        });

        const savedGroup = await group.save();
        res.status(201).json({ message: 'Groupe créé avec succès', group: savedGroup });
      } catch (err) {
        console.error(`[ERROR] POST /group -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  // 📋 Récupérer tous les groupes
  listAll() {
    this.app.get('/groups', async (req, res) => {
      try {
        const groups = await this.GroupModel.find()
          .populate('createdBy', 'name email')
          .populate('members', 'name email');
        res.status(200).json(groups);
      } catch (err) {
        console.error(`[ERROR] GET /groups -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  // 📘 Récupérer un groupe par ID
  showById() {
    this.app.get('/group/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findById(req.params.id)
          .populate('createdBy', 'name email')
          .populate('members', 'name email');
        if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
        res.status(200).json(group);
      } catch (err) {
        console.error(`[ERROR] GET /group/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  // ✏️ Mettre à jour un groupe
  updateById() {
    this.app.put('/group/:id', async (req, res) => {
      try {
        const updatedGroup = await this.GroupModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGroup) return res.status(404).json({ message: 'Groupe non trouvé' });
        res.status(200).json({ message: 'Groupe mis à jour avec succès', group: updatedGroup });
      } catch (err) {
        console.error(`[ERROR] PUT /group/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  // ❌ Supprimer un groupe
  deleteById() {
    this.app.delete('/group/:id', async (req, res) => {
      try {
        const deleted = await this.GroupModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Groupe non trouvé' });
        res.status(200).json({ message: 'Groupe supprimé avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /group/:id -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  // Lancement de toutes les routes
  run() {
    this.create();
    this.listAll();
    this.showById();
    this.updateById();
    this.deleteById();
  }
};

export default Groups;
