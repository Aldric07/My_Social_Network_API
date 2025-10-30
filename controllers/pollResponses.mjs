import PollResponseModel from '../models/pollResponse.mjs';

const PollResponses = class PollResponses {
  constructor(app) {
    this.app = app;
    this.PollResponseModel = PollResponseModel;
    this.run();
  }

  create() {
    this.app.post('/poll-response', async (req, res) => {
      try {
        const { question, respondent, selectedOption } = req.body;

        const response = new this.PollResponseModel({ question, respondent, selectedOption });
        const savedResponse = await response.save();

        res.status(201).json({ message: 'Réponse enregistrée avec succès', response: savedResponse });
      } catch (err) {
        console.error(`[ERROR] POST /poll-response -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  listAll() {
    this.app.get('/poll-responses', async (req, res) => {
      try {
        const responses = await this.PollResponseModel.find()
          .populate('question', 'questionText')
          .populate('respondent', 'name email');
        res.status(200).json(responses);
      } catch (err) {
        console.error(`[ERROR] GET /poll-responses -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/poll-response/:id', async (req, res) => {
      try {
        const response = await this.PollResponseModel.findById(req.params.id)
          .populate('question', 'questionText')
          .populate('respondent', 'name email');
        if (!response) return res.status(404).json({ message: 'Réponse non trouvée' });
        res.status(200).json(response);
      } catch (err) {
        console.error(`[ERROR] GET /poll-response/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  updateById() {
    this.app.put('/poll-response/:id', async (req, res) => {
      try {
        const updated = await this.PollResponseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Réponse non trouvée' });
        res.status(200).json({ message: 'Réponse mise à jour avec succès', response: updated });
      } catch (err) {
        console.error(`[ERROR] PUT /poll-response/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  deleteById() {
    this.app.delete('/poll-response/:id', async (req, res) => {
      try {
        const deleted = await this.PollResponseModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Réponse non trouvée' });
        res.status(200).json({ message: 'Réponse supprimée avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /poll-response/:id -> ${err}`);
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

export default PollResponses;
