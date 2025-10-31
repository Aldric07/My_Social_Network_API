import Carpool from "../models/carpool.mjs";
import Event from "../models/event.mjs";

const Carpools = class Carpools {
  constructor(app) {
    this.app = app;
    this.Carpool = Carpool;
    this.run();
  }

  // ➕ Créer un trajet de covoiturage
  create() {
    this.app.post("/carpool", async (req, res) => {
      try {
        const { eventId, driver, departureLocation, departureTime, price, availableSeats, maxDelay } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Événement introuvable." });

        const carpool = new this.Carpool({
          event: eventId,
          driver,
          departureLocation,
          departureTime,
          price,
          availableSeats,
          maxDelay
        });

        const savedCarpool = await carpool.save();
        res.status(201).json({ message: "Covoiturage créé avec succès", carpool: savedCarpool });
      } catch (err) {
        console.error(`[ERROR] POST /carpool -> ${err}`);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    });
  }

  // 📋 Lister les trajets d’un événement
  listByEvent() {
    this.app.get("/carpools/:eventId", async (req, res) => {
      try {
        const carpools = await this.Carpool.find({ event: req.params.eventId })
          .populate("driver", "name email");
        res.status(200).json(carpools);
      } catch (err) {
        console.error(`[ERROR] GET /carpools/:eventId -> ${err}`);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    });
  }

  // ❌ Supprimer un trajet
  deleteById() {
    this.app.delete("/carpool/:id", async (req, res) => {
      try {
        const deleted = await this.Carpool.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Covoiturage introuvable" });
        res.status(200).json({ message: "Covoiturage supprimé avec succès" });
      } catch (err) {
        console.error(`[ERROR] DELETE /carpool/:id -> ${err}`);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    });
  }

  run() {
    this.create();
    this.listByEvent();
    this.deleteById();
  }
};

export default Carpools;
