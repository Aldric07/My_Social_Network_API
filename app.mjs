import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import routes from './routes/routes.mjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Initialise les ressources
new routes.Users(app, mongoose);
new routes.Events(app, mongoose);
new routes.Groups(app, mongoose);
new routes.Threads(app, mongoose);
new routes.Albums(app, mongoose);
new routes.Photos(app, mongoose);
new routes.PhotoComments(app, mongoose);
new routes.Polls(app, mongoose);
new routes.PollQuestions(app, mongoose);
new routes.PollResponses(app, mongoose);
new routes.TicketTypeController(app, mongoose);
new routes.Tickets(app, mongoose);
// Plus tard : new routes.Events(app, mongoose);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
