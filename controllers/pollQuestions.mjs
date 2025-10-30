import PollQuestionModel from '../models/pollQuestion.mjs';

const PollQuestions = class PollQuestions {
  constructor(app) {
    this.app = app;
    this.PollQuestionModel = PollQuestionModel;
    this.run();
  }

  create() {
    this.app.post('/poll-question', async (req, res) => {
      try {
        const { poll, questionText, options } = req.body;

        const question = new this.PollQuestionModel({ poll, questionText, options });
        const savedQuestion = await question.save();

        res.status(201).json({ message: 'Question créée avec succès', question: savedQuestion });
      } catch (err) {
        console.error(`[ERROR] POST /poll-question -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  listAll() {
    this.app.get('/poll-questions', async (req, res) => {
      try {
        const questions = await this.PollQuestionModel.find()
          .populate('poll', 'title');
        res.status(200).json(questions);
      } catch (err) {
        console.error(`[ERROR] GET /poll-questions -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/poll-question/:id', async (req, res) => {
      try {
        const question = await this.PollQuestionModel.findById(req.params.id)
          .populate('poll', 'title');
        if (!question) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json(question);
      } catch (err) {
        console.error(`[ERROR] GET /poll-question/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  updateById() {
    this.app.put('/poll-question/:id', async (req, res) => {
      try {
        const updated = await this.PollQuestionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json({ message: 'Question mise à jour avec succès', question: updated });
      } catch (err) {
        console.error(`[ERROR] PUT /poll-question/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  deleteById() {
    this.app.delete('/poll-question/:id', async (req, res) => {
      try {
        const deleted = await this.PollQuestionModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json({ message: 'Question supprimée avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /poll-question/:id -> ${err}`);
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

export default PollQuestions;
