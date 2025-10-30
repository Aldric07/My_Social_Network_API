import TicketType from "../models/ticketType.mjs";
import Event from "../models/event.mjs";

class TicketTypeController {
  constructor(app) {
    this.app = app;
    this.run();
  }

  create() {
    this.app.post("/ticket-type", async (req, res) => {
      try {
        const { eventId, name, amount, quantity } = req.body;
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Événement introuvable." });

        const ticketType = new TicketType({ event: eventId, name, amount, quantity });
        const saved = await ticketType.save();

        res.status(201).json(saved);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  }

  listByEvent() {
    this.app.get("/ticket-types/:eventId", async (req, res) => {
      try {
        const tickets = await TicketType.find({ event: req.params.eventId });
        res.status(200).json(tickets);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  }

  delete() {
    this.app.delete("/ticket-type/:id", async (req, res) => {
      try {
        const deleted = await TicketType.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Type de billet introuvable." });
        res.status(200).json({ message: "Type de billet supprimé avec succès." });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  }

  run() {
    this.create();
    this.listByEvent();
    this.delete();
  }
}

export default TicketTypeController;
