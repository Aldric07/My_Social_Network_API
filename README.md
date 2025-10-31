# 🧑‍🤝‍🧑 My Social Network API

Une API RESTful complète inspirée du fonctionnement des réseaux sociaux (comme Facebook Events) permettant la **gestion d’événements, de groupes, de sondages, de billets, d’albums photo, de discussions**, et bien plus.

Développée avec **Node.js, Express.js et MongoDB (Mongoose)**.

---

## 🚀 Fonctionnalités principales

### 📅 Événements

* Création, mise à jour et suppression d’événements.
* Association d’un organisateur.
* Possibilité d’activer la **billetterie**, la **shopping list** et le **covoiturage**.
* Association à un groupe.

### 👥 Groupes

* Groupes publics, privés ou secrets.
* Icône, photo de couverture, description.
* Autorisation ou non des membres à publier ou créer des événements.
* Fil de discussion intégré.

### 💬 Fils de discussion

* Chaque fil peut être lié à **un événement** ou **un groupe**, jamais les deux.
* Contient des messages écrits par les membres/participants.
* Possibilité de répondre à un message.

### 📸 Albums photo

* Un album est associé à un **événement**.
* Contient plusieurs **photos** postées par les participants.
* Les photos peuvent être **commentées**.

### 🗳️ Sondages

* Créés par les **organisateurs** d’un événement.
* Composés de plusieurs **questions** à choix unique.
* Les participants peuvent voter à chaque question.

### 🎟️ Billetterie

* Gestion des **types de billets** : nom, prix, quantité.
* Achat d’un billet par une personne extérieure (nom, prénom, adresse, date d’achat).
* Lien direct avec un événement public.

### 🛒 Shopping List *(Bonus)*

* Si activée sur un événement, les participants peuvent indiquer :

  * Ce qu’ils apportent,
  * La quantité,
  * Leur heure d’arrivée.
* Chaque élément apporté est **unique** par événement.

### 🚗 Covoiturage *(Bonus)*

* Si activé, un utilisateur peut proposer un trajet :

  * Lieu de départ,
  * Heure de départ,
  * Prix proposé,
  * Nombre de places,
  * Temps maximum d’écart toléré.

---

## 🛠️ Stack technique

| Technologie    | Description                                    |
| -------------- | ---------------------------------------------- |
| **Node.js**    | Environnement d’exécution JavaScript           |
| **Express.js** | Framework pour créer les routes et controllers |
| **MongoDB**    | Base de données NoSQL                          |
| **Mongoose**   | ORM pour la gestion des modèles et schémas     |
| **Dotenv**     | Gestion des variables d’environnement          |
| **Postman**    | Outil pour tester les endpoints de l’API       |

---

## 📂 Structure du projet

```
My_Social_Network_API/
│
├── models/
│   ├── album.mjs
│   ├── carpool.mjs
│   ├── event.mjs
│   ├── group.mjs
│   ├── message.mjs
│   ├── photo.mjs
│   ├── photoComment.mjs
│   ├── poll.mjs
│   ├── pollQuestion.mjs
│   ├── pollResponse.mjs
│   ├── shoppingItem.mjs
│   ├── thread.mjs
│   ├── ticket.mjs
│   ├── ticketType.mjs
│   └── user.mjs
│
├── controllers/
│   ├── albumController.mjs
│   ├── carpoolController.mjs
│   ├── events.mjs
│   ├── groups.mjs
│   ├── photoCommentController.mjs
│   ├── photoController.mjs
│   ├── pollQuestions.mjs
│   ├── pollResponses.mjs
│   ├── polls.mjs
│   ├── shoppingListController.mjs
│   ├── threadController.mjs
│   ├── ticketController.mjs
│   ├── ticketTypeController.mjs
│   └── users.mjs
│── routes/
│   └── routes.mjs
│
├── app.mjs
├── package.json
├── .env
├── 
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Aldric07/My_Social_Network_API.git
cd My_Social_Network_API
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Créer le fichier `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://dyyam:Yoannmahugnon2006@cluster0.dnkp63r.mongodb.net/facebook
```

### 4️⃣ Lancer le serveur

```bash
node app.mjs
```

Le serveur démarre sur : [http://localhost:5000](http://localhost:5000)

---

## 📬 Exemples de requêtes Postman

### ➕ Créer un événement

```json
POST /api/event
{
  "title": "Soirée Étudiante EFREI",
  "description": "Soirée de rentrée avec DJ et buffet",
  "date": "2025-12-20",
  "location": "Paris",
  "organizer": "690347e669ab5bef5097035f"
}
```

### ➕ Créer un groupe

```json
POST /api/group
{
  "name": "EFREI Family",
  "description": "Groupe des étudiants IA & Data",
  "type": "public",
  "allowPosts": true,
  "allowEvents": true,
  "createdBy": "690347e669ab5bef5097035f"
}
```

###  Créer un sondage complet

1️⃣ Créer un sondage

```json
POST /api/polls
{
  "event": "6903691b1014f41a92ef83db",
  "title": "Préférences du repas",
  "createdBy": "690347e669ab5bef5097035f"
}
```

2️⃣ Ajouter une question

```json
POST /api/poll-question
{
  "poll": "6903aaf6bd2c862a345ccc8b",
  "text": "Que voulez-vous manger ?"
}
```

3️⃣ Ajouter des réponses

```json
POST /api/poll-response
{
  "question": "6903ab47bd2c862a345ccc8d",
  "text": "Pizza"
}
```

```json
POST /api/poll-response
{
  "question": "6903ab47bd2c862a345ccc8d",
  "text": "Sushi"
}
```

###  Créer un type de billet

```json
POST /api/ticket-types
{
  "event": "6903691b1014f41a92ef83db",
  "name": "Entrée VIP",
  "price": 50,
  "quantity": 20
}
```

### 🛒 Ajouter un élément à la shopping list

```json
POST /api/shopping-list
{
  "event": "6903691b1014f41a92ef83db",
  "name": "Bouteilles d’eau",
  "quantity": 10,
  "arrivalTime": "2025-12-20T19:00:00Z",
  "user": "690347e669ab5bef5097035f"
}
```

###  Créer un covoiturage

```json
POST /api/carpool
{
  "event": "6903691b1014f41a92ef83db",
  "departureLocation": "Lyon",
  "departureTime": "2025-12-20T15:00:00Z",
  "price": 15,
  "availableSeats": 3,
  "maxDelayMinutes": 30,
  "driver": "690347e669ab5bef5097035f"
}
```

---

## 🧠 Auteur

👤 **Yoann Dossou-Yovo**
Étudiant en informatique à **EFREI**, passionné par l’**IA, le développement backend et les architectures web scalables**.

---

## 📜 Licence

Ce projet est sous licence **MIT** — vous êtes libre de l’utiliser et le modifier.
