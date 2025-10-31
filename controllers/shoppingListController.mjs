import ShoppingItem from "../models/shoppingItem.mjs";
import Event from "../models/event.mjs";

const ShoppingList = class ShoppingList {
  constructor(app) {
    this.app = app;
    this.ShoppingItem = ShoppingItem;
    this.run();
  }

  // ➕ Ajouter un élément à la liste
  create() {
    this.app.post("/shopping-item", async (req, res) => {
      try {
        const { eventId, name, quantity, arrivalTime, broughtBy } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Événement introuvable." });

        // Vérifie si un même nom existe déjà dans cet événement
        const existing = await this.ShoppingItem.findOne({ event: eventId, name });
        if (existing)
          return res.status(400).json({ message: "Cet élément existe déjà pour cet événement." });

        const item = new this.ShoppingItem({ event: eventId, name, quantity, arrivalTime, broughtBy });
        const savedItem = await item.save();

        res.status(201).json({ message: "Élément ajouté avec succès", item: savedItem });
      } catch (err) {
        console.error(`[ERROR] POST /shopping-item -> ${err}`);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    });
  }

  // 📋 Lister les éléments d’un événement
  listByEvent() {
    this.app.get("/shopping-items/:eventId", async (req, res) => {
      try {
        const items = await this.ShoppingItem.find({ event: req.params.eventId })
          .populate("broughtBy", "name email");
        res.status(200).json(items);
      } catch (err) {
        console.error(`[ERROR] GET /shopping-items/:eventId -> ${err}`);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
    });
  }

  // ❌ Supprimer un élément
  deleteById() {
    this.app.delete("/shopping-item/:id", async (req, res) => {
      try {
        const deleted = await this.ShoppingItem.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Élément introuvable" });
        res.status(200).json({ message: "Élément supprimé avec succès" });
      } catch (err) {
        console.error(`[ERROR] DELETE /shopping-item/:id -> ${err}`);
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

export default ShoppingList;
