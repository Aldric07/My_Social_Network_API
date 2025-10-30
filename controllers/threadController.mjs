import ThreadModel from '../models/thread.mjs';
import MessageModel from '../models/message.mjs';

const Threads = class Threads {
  constructor(app) {
    this.app = app;
    this.ThreadModel = ThreadModel;
    this.MessageModel = MessageModel;
    this.run();
  }

  // ➕ Créer un fil de discussion
  create() {
    this.app.post('/thread', async (req, res) => {
      try {
        const { title, group, event, createdBy } = req.body;

        const thread = new this.ThreadModel({ title, group, event, createdBy });
        const savedThread = await thread.save();
        res.status(201).json({ message: 'Fil de discussion créé', thread: savedThread });
      } catch (err) {
        console.error(`[ERROR] POST /thread -> ${err}`);
        res.status(400).json({ code: 400, message: err.message });
      }
    });
  }

  // 📋 Récupérer tous les fils
  listAll() {
    this.app.get('/threads', async (req, res) => {
      try {
        const threads = await this.ThreadModel.find()
          .populate('group', 'name')
          .populate('event', 'title')
          .populate('createdBy', 'name email')
          .populate({
            path: 'messages',
            populate: { path: 'author replies', select: 'name content' }
          });
        res.status(200).json(threads);
      } catch (err) {
        console.error(`[ERROR] GET /threads -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  // 📘 Ajouter un message à un fil
  addMessage() {
    this.app.post('/thread/:id/message', async (req, res) => {
      try {
        const { content, author, replyTo } = req.body;

        const message = new this.MessageModel({ content, author });
        if (replyTo) message.replies.push(replyTo); // si c’est une réponse

        const savedMessage = await message.save();

        const thread = await this.ThreadModel.findById(req.params.id);
        if (!thread) return res.status(404).json({ message: 'Fil non trouvé' });

        thread.messages.push(savedMessage._id);
        await thread.save();

        res.status(201).json({ message: 'Message ajouté', savedMessage });
      } catch (err) {
        console.error(`[ERROR] POST /thread/:id/message -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  run() {
    this.create();
    this.listAll();
    this.addMessage();
  }
};

export default Threads;
