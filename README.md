# Quid

Quid is a skill-trading platform where users exchange services instead of money.
Users can post skill offers or requests and create trade proposals with other users.

This project was built as a full-stack capstone using Next.js, MongoDB, and
custom session-based authentication.

---

## Features

- User authentication (signup, login, logout)
- Session-based auth using httpOnly cookies
- Global auth state via React Context API
- Skill offers and requests stored in MongoDB
- Trade proposal workflow with ownership rules
- Full CRUD for proposals (create, view, edit, delete)
- Protected actions based on authenticated user
- Modular REST API using Next.js App Router

---

## User Flow

1. User signs up and logs in
2. User creates a skill offer or request
3. User browses available skills
4. User creates a trade proposal
5. Proposal owner can update or delete their proposal

---

## Tech Stack

- **Frontend:** React, Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** JWT-based sessions stored in httpOnly cookies
- **State Management:** React Context API (AuthContext)
- **Styling:** CSS globals and inline styles
- **Deployment:** Vercel (or Render)

---

## Data Models

### User
- email
- passwordHash

### Skill
- ownerId (User)
- title
- description
- type (`OFFER` | `REQUEST`)

### Proposal
- ownerId (User)
- title
- description
- offer
- requested
- createdAt

---

## API Routes

### Authentication
- `POST /api/signup` – create user
- `POST /api/login` – authenticate user
- `POST /api/logout` – clear session
- `GET /api/me` – get current user session

### Skills
- `GET /api/skills` – list skills
- `POST /api/skills` – create skill
- `GET /api/skills/:id` – get skill by id

### Proposals
- `GET /api/proposals` – list proposals
- `POST /api/proposals` – create proposal (requires auth)
- `GET /api/proposals/:id` – get proposal
- `PATCH /api/proposals/:id` – update proposal (owner only)
- `DELETE /api/proposals/:id` – delete proposal (owner only)

---

## Getting Started (Local)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd quid