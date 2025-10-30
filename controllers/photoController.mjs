import PhotoModel from '../models/photo.mjs';

const Photos = class Photos {
  constructor(app) {
    this.app = app;
    this.PhotoModel = PhotoModel;
    this.run();
  }

  create() {
    this.app.post('/photo', async (req, res) => {
      try {
        const { album, url, uploadedBy, caption } = req.body;

        const photo = new this.PhotoModel({ album, url, uploadedBy, caption });
        const savedPhoto = await photo.save();

        res.status(201).json({ message: 'Photo ajoutée avec succès', photo: savedPhoto });
      } catch (err) {
        console.error(`[ERROR] POST /photo -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  listAll() {
    this.app.get('/photos', async (req, res) => {
      try {
        const photos = await this.PhotoModel.find()
          .populate('album', 'title')
          .populate('uploadedBy', 'name email');
        res.status(200).json(photos);
      } catch (err) {
        console.error(`[ERROR] GET /photos -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/photo/:id', async (req, res) => {
      try {
        const photo = await this.PhotoModel.findById(req.params.id)
          .populate('album', 'title')
          .populate('uploadedBy', 'name email');
        if (!photo) return res.status(404).json({ message: 'Photo non trouvée' });
        res.status(200).json(photo);
      } catch (err) {
        console.error(`[ERROR] GET /photo/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  updateById() {
    this.app.put('/photo/:id', async (req, res) => {
      try {
        const updatedPhoto = await this.PhotoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPhoto) return res.status(404).json({ message: 'Photo non trouvée' });
        res.status(200).json({ message: 'Photo mise à jour avec succès', photo: updatedPhoto });
      } catch (err) {
        console.error(`[ERROR] PUT /photo/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  deleteById() {
    this.app.delete('/photo/:id', async (req, res) => {
      try {
        const deleted = await this.PhotoModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Photo non trouvée' });
        res.status(200).json({ message: 'Photo supprimée avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /photo/:id -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.listAll();
    this.showById();
    this.updateById();
    this.deleteById();
  }
};

export default Photos;
