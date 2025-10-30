import PollModel from "../models/poll.mjs";

const Polls = class Polls {
  constructor(app) {
    this.app = app;
    this.PollModel = PollModel;
    this.run();
  }

  create() {
    this.app.post("/poll", async (req, res) => {
      try {
        const { event, title, description, createdBy } = req.body;
        const poll = new this.PollModel({ event, title, description, createdBy });
        const savedPoll = await poll.save();
        res.status(201).json({ message: "Sondage créé avec succès", poll: savedPoll });
      } catch (err) {
        console.error(`[ERROR] POST /poll -> ${err}`);
        res.status(500).json({ code: 500, message: "Erreur interne du serveur" });
      }
    });
  }

  listAll() {
    this.app.get("/polls", async (req, res) => {
      try {
        const polls = await this.PollModel.find()
          .populate("event", "title date")
          .populate("createdBy", "name email");
        res.status(200).json(polls);
      } catch (err) {
        console.error(`[ERROR] GET /polls -> ${err}`);
        res.status(500).json({ code: 500, message: "Erreur interne du serveur" });
      }
    });
  }

  showById() {
    this.app.get("/poll/:id", async (req, res) => {
      try {
        const poll = await this.PollModel.findById(req.params.id)
          .populate("event", "title date")
          .populate("createdBy", "name email");
        if (!poll) return res.status(404).json({ message: "Sondage non trouvé" });
        res.status(200).json(poll);
      } catch (err) {
        console.error(`[ERROR] GET /poll/:id -> ${err}`);
        res.status(400).json({ code: 400, message: "Requête invalide" });
      }
    });
  }

  updateById() {
    this.app.put("/poll/:id", async (req, res) => {
      try {
        const updatedPoll = await this.PollModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPoll) return res.status(404).json({ message: "Sondage non trouvé" });
        res.status(200).json({ message: "Sondage mis à jour avec succès", poll: updatedPoll });
      } catch (err) {
        console.error(`[ERROR] PUT /poll/:id -> ${err}`);
        res.status(400).json({ code: 400, message: "Requête invalide" });
      }
    });
  }

  deleteById() {
    this.app.delete("/poll/:id", async (req, res) => {
      try {
        const deleted = await this.PollModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Sondage non trouvé" });
        res.status(200).json({ message: "Sondage supprimé avec succès" });
      } catch (err) {
        console.error(`[ERROR] DELETE /poll/:id -> ${err}`);
        res.status(500).json({ code: 500, message: "Erreur interne du serveur" });
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

export default Polls;
