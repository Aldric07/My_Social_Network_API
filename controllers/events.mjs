import EventModel from '../models/event.mjs';

const Events = class Events {
  constructor(app) {
    this.app = app;
    this.EventModel = EventModel;
    this.run();
  }

  create() {
    this.app.post('/event', async (req, res) => {
      try {
        const { title, description, date, location, createdBy } = req.body;

        const event = new this.EventModel({ title, description, date, location, createdBy });
        const savedEvent = await event.save();

        res.status(201).json({ message: 'Event créé avec succès', event: savedEvent });
      } catch (err) {
        console.error(`[ERROR] POST /event -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  listAll() {
    this.app.get('/events', async (req, res) => {
      try {
        const events = await this.EventModel.find()
          .populate('createdBy', 'name email')
          .populate('attendees', 'name email');
        res.status(200).json(events);
      } catch (err) {
        console.error(`[ERROR] GET /events -> ${err}`);
        res.status(500).json({ code: 500, message: 'Erreur interne du serveur' });
      }
    });
  }

  showById() {
    this.app.get('/event/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findById(req.params.id)
          .populate('createdBy', 'name email')
          .populate('attendees', 'name email');
        if (!event) return res.status(404).json({ message: 'Event non trouvé' });
        res.status(200).json(event);
      } catch (err) {
        console.error(`[ERROR] GET /event/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  updateById() {
    this.app.put('/event/:id', async (req, res) => {
      try {
        const updatedEvent = await this.EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event non trouvé' });
        res.status(200).json({ message: 'Event mis à jour avec succès', event: updatedEvent });
      } catch (err) {
        console.error(`[ERROR] PUT /event/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Requête invalide' });
      }
    });
  }

  deleteById() {
    this.app.delete('/event/:id', async (req, res) => {
      try {
        const deleted = await this.EventModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Event non trouvé' });
        res.status(200).json({ message: 'Event supprimé avec succès' });
      } catch (err) {
        console.error(`[ERROR] DELETE /event/:id -> ${err}`);
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

export default Events;
