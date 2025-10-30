import TicketModel from "../models/ticket.mjs";
import TicketTypeModel from "../models/ticketType.mjs";

const Tickets = class Tickets {
  constructor(app) {
    this.app = app;
    this.TicketModel = TicketModel;
    this.TicketTypeModel = TicketTypeModel;
    this.run();
  }

  // ➕ Créer un billet (achat)
  create() {
    this.app.post("/ticket", async (req, res) => {
      try {
        const { ticketTypeId, firstName, lastName, address } = req.body;

        const ticketType = await this.TicketTypeModel.findById(ticketTypeId);
        if (!ticketType) return res.status(404).json({ message: "Type de billet introuvable." });

        const count = await this.TicketModel.countDocuments({ ticketType: ticketTypeId });
        if (count >= ticketType.quantity)
          return res.status(400).json({ message: "Nombre maximum de billets atteint." });

        const ticket = new this.TicketModel({
          ticketType: ticketTypeId,
          firstName,
          lastName,
          address
        });

        const savedTicket = await ticket.save();
        res.status(201).json({ message: "Billet créé avec succès", ticket: savedTicket });
      } catch (err) {
        console.error(`[ERROR] POST /ticket -> ${err}`);
        res.status(500).json({ code: 500, message: "Erreur interne du serveur" });
      }
    });
  }

  // 📋 Lister tous les billets d’un type
  listByType() {
    this.app.get("/tickets/:ticketTypeId", async (req, res) => {
      try {
        const tickets = await this.TicketModel.find({ ticketType: req.params.ticketTypeId });
        res.status(200).json(tickets);
      } catch (err) {
        console.error(`[ERROR] GET /tickets/:ticketTypeId -> ${err}`);
        res.status(500).json({ code: 500, message: "Erreur interne du serveur" });
      }
    });
  }

  // 📘 Récupérer un billet par ID
  showById() {
    this.app.get("/ticket/:id", async (req, res) => {
      try {
        const ticket = await this.TicketModel.findById(req.params.id).populate("ticketType");
        if (!ticket) return res.status(404).json({ message: "Billet non trouvé" });
        res.status(200).json(ticket);
      } catch (err) {
        console.error(`[ERROR] GET /ticket/:id -> ${err}`);
        res.status(400).json({ code: 400, message: "Requête invalide" });
      }
    });
  }

  // ❌ Supprimer un billet par ID
  deleteById() {
    this.app.delete("/ticket/:id", async (req, res) => {
      try {
        const deleted = await this.TicketModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Billet non trouvé" });
        res.status(200).json({ message: "Billet supprimé avec succès" });
      } catch (err) {
        console.error(`[ERROR] DELETE /ticket/:id -> ${err}`);
        res.status(500).json({ code: 500, message: "Erreur interne du serveur" });
      }
    });
  }

  // Lancement de toutes les routes
  run() {
    this.create();
    this.listByType();
    this.showById();
    this.deleteById();
  }
};

export default Tickets;
