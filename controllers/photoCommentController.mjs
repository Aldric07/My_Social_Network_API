import PhotoCommentModel from '../models/photoComment.mjs';

const PhotoComments = class PhotoComments {
  constructor(app) {
    this.app = app;
    this.PhotoCommentModel = PhotoCommentModel;
    this.run();
  }

  create() {
    this.app.post('/photo-comment', async (req, res) => {
      try {
        const { photo, author, content } = req.body;

        const comment = new this.PhotoCommentModel({ photo, author, content });
        const savedComment = await comment.save();

        res.status(201).json({ message: 'Commentaire ajouté avec succès', comment: savedComment });
      } catch (err) {
        console.error(`[ERROR] POST /photo-comment -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  listAll() {
    this.app.get('/photo-comments', async (req, res) => {
      try {
        const comments = await this.PhotoCommentModel.find()
          .populate('photo', 'url')
          .populate('author', 'name email');
        res.status(200).json(comments);
      } catch (err) {
        console.error(`[ERROR] GET /photo-comments -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/photo-comment/:id', async (req, res) => {
      try {
        const comment = await this.PhotoCommentModel.findById(req.params.id)
          .populate('photo', 'url')
          .populate('author', 'name email');
        if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json(comment);
      } catch (err) {
        console.error(`[ERROR] GET /photo-comment/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  updateById() {
    this.app.put('/photo-comment/:id', async (req, res) => {
      try {
        const updatedComment = await this.PhotoCommentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComment) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json({ message: 'Commentaire mis à jour avec succès', comment: updatedComment });
      } catch (err) {
        console.error(`[ERROR] PUT /photo-comment/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  deleteById() {
    this.app.delete('/photo-comment/:id', async (req, res) => {
      try {
        const deleted = await this.PhotoCommentModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Commentaire non trouvé' });
        res.status(200).json({ message: 'Commentaire supprimé avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /photo-comment/:id -> ${err}`);
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

export default PhotoComments;
