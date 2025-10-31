import Users from '../controllers/users.mjs';
import Events from '../controllers/events.mjs';
import Groups from '../controllers/groups.mjs';
import Threads from '../controllers/threadController.mjs'; 
import Albums from '../controllers/albumController.mjs';
import PhotoComments  from '../controllers/photoCommentController.mjs';
import Photos from '../controllers/photoController.mjs';
import Polls from '../controllers/polls.mjs';
import PollQuestions from '../controllers/pollQuestions.mjs';
import PollResponses from '../controllers/pollResponses.mjs';
import TicketTypeController from '../controllers/ticketTypeController.mjs';
import Tickets from '../controllers/ticketController.mjs';
import ShoppingListController from '../controllers/shoppingListController.mjs';
import CarpoolController from '../controllers/carpoolController.mjs';
// Plus tard : import Events from './events.mjs'; etc.

export default {
  Users,
  Events,
  Groups,
  Threads,
  Albums,
  Photos,
  PhotoComments,
  Polls,
  PollQuestions,
  PollResponses,
  TicketTypeController,
  Tickets,
  ShoppingListController,
  CarpoolController
};
