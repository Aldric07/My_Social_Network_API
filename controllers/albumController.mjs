import AlbumModel from '../models/album.mjs';

const Albums = class Albums {
  constructor(app) {
    this.app = app;
    this.AlbumModel = AlbumModel;
    this.run();
  }

  create() {
    this.app.post('/album', async (req, res) => {
      try {
        const { event, title, description, createdBy } = req.body;

        const album = new this.AlbumModel({ event, title, description, createdBy });
        const savedAlbum = await album.save();

        res.status(201).json({ message: 'Album créé avec succès', album: savedAlbum });
      } catch (err) {
        console.error(`[ERROR] POST /album -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  listAll() {
    this.app.get('/albums', async (req, res) => {
      try {
        const albums = await this.AlbumModel.find()
          .populate('event', 'title date')
          .populate('createdBy', 'name email');
        res.status(200).json(albums);
      } catch (err) {
        console.error(`[ERROR] GET /albums -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/album/:id', async (req, res) => {
      try {
        const album = await this.AlbumModel.findById(req.params.id)
          .populate('event', 'title date')
          .populate('createdBy', 'name email');
        if (!album) return res.status(404).json({ message: 'Album non trouvé' });
        res.status(200).json(album);
      } catch (err) {
        console.error(`[ERROR] GET /album/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  updateById() {
    this.app.put('/album/:id', async (req, res) => {
      try {
        const updatedAlbum = await this.AlbumModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAlbum) return res.status(404).json({ message: 'Album non trouvé' });
        res.status(200).json({ message: 'Album mis à jour avec succès', album: updatedAlbum });
      } catch (err) {
        console.error(`[ERROR] PUT /album/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  deleteById() {
    this.app.delete('/album/:id', async (req, res) => {
      try {
        const deleted = await this.AlbumModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Album non trouvé' });
        res.status(200).json({ message: 'Album supprimé avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /album/:id -> ${err}`);
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

export default Albums;
