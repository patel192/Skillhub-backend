<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<h1 align="center">🎓 SkillHub — Backend API</h1>

<p align="center">
  <b>A feature-rich RESTful API & real-time WebSocket server powering the SkillHub learning platform.</b><br/>
  Built with Node.js, Express 5, MongoDB, and Socket.IO.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-websocket-events">WebSocket Events</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

| Category | Highlights |
|---|---|
| **Authentication** | JWT-based auth with role-based access control (User / Admin) |
| **Course Management** | Full CRUD for courses, lessons, quizzes, and learning resources |
| **Real-time Messaging** | Socket.IO-powered chat with typing indicators, read receipts, reactions, message editing & deletion |
| **Community** | Community creation & management, posts with likes/comments, and social feeds |
| **Social Features** | Friend requests, public profiles, leaderboard with points & achievements |
| **Notifications** | Event-driven notification system via Node.js EventEmitter |
| **Progress Tracking** | Enrollment tracking, course progress, certificate generation |
| **Admin Dashboard** | User management, analytics, reports, admin logs, and content moderation |
| **File Uploads** | Multer-based file handling with persistent Docker volumes |
| **Health Monitoring** | Built-in `/health` endpoint with Docker HEALTHCHECK |

---

## 🏗 Architecture

```
Skillhub-backend/
├── index.js                  # Server entry point (HTTP + Socket.IO bootstrap)
├── app.js                    # Express application setup & route registration
├── socket.js                 # Socket.IO initialization & real-time event handlers
│
├── controllers/              # Business logic (26 controllers)
│   ├── UserController.js           # Auth, registration, profile management
│   ├── CourseController.js         # Course CRUD operations
│   ├── EnrollmentController.js     # Enrollment lifecycle
│   ├── ProgressController.js       # Learning progress tracking
│   ├── MessagesController.js       # Messaging (REST endpoints)
│   ├── CommunityController.js      # Community management
│   ├── PostController.js           # Social posts, likes, comments
│   ├── FriendsController.js        # Friend system
│   ├── AchievementController.js    # Achievements & gamification
│   ├── CertificateController.js    # Certificate generation
│   ├── QuizController.js           # Quiz management
│   ├── ReportController.js         # User reports & moderation
│   ├── NotificationController.js   # Notification handling
│   ├── FeedbackController.js       # User feedback collection
│   ├── AnalyticsController.js      # Platform analytics
│   ├── AdminDashboardOverviewController.js  # Admin overview stats
│   ├── AdminLogController.js       # Admin action logging
│   ├── ResourcesController.js      # Learning resources
│   ├── OverviewController.js       # User dashboard overview
│   ├── UserSettingsController.js   # User preferences
│   └── ...                         # Categories, Skills, Blogs, Events, etc.
│
├── models/                   # Mongoose schemas (26 models)
│   ├── UserModel.js                # User with roles, social links, achievements
│   ├── CoursesModel.js             # Course structure
│   ├── EnrollmentModel.js          # User-course enrollment records
│   ├── MessagesModel.js            # Chat messages with reactions
│   ├── CommunityModel.js           # Community groups
│   ├── PostModel.js                # Social posts
│   ├── ProgressModel.js            # Learning progress
│   ├── QuizModel.js                # Quizzes & assessments
│   ├── NotificationModel.js        # In-app notifications
│   ├── AchievementModel.js         # Gamification achievements
│   ├── CertificatesModel.js        # Completion certificates
│   ├── ReportModel.js              # User reports
│   ├── FeedbackModel.js            # Platform feedback
│   ├── ActivityLogModel.js         # Activity tracking
│   ├── AdminLogModel.js            # Admin audit trail
│   └── ...                         # Analytics, Resources, Events, etc.
│
├── routes/                   # Express route definitions (26 route files)
│   └── (mirrors controller structure with RESTful endpoints)
│
├── middleware/               # Express middleware
│   ├── authMiddleware.js           # JWT verification & admin authorization
│   ├── cloudinary.js               # Cloudinary image upload config
│   └── upload.js                   # Multer file upload configuration
│
├── events/                   # Event-driven architecture
│   ├── EventEmitter.js             # Custom event emitter instance
│   └── listners.js                 # Event handlers (enrollment, posts, likes, comments)
│
├── tests/                    # Test suite
│   └── health.test.js              # Health endpoint tests
│
├── .github/workflows/        # CI/CD
│   └── backend-ci.yml              # GitHub Actions: test → build → deploy to Render
│
├── Dockerfile                # Multi-stage Docker build (Node 20 Alpine)
├── .dockerignore             # Docker build exclusions
└── package.json              # Dependencies & scripts
```

### Design Patterns

- **MVC Architecture** — Controllers handle business logic, Models define data, Routes define endpoints
- **Event-Driven Notifications** — Node.js `EventEmitter` decouples notification creation from core business logic
- **JWT Authentication** — Stateless token-based auth with role-based middleware guards
- **Real-time Layer** — Socket.IO runs alongside Express on the same HTTP server

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| **Node.js** | ≥ 18.x |
| **npm** | ≥ 9.x |
| **MongoDB** | Atlas (cloud) or local instance |

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/skillhub-backend.git
cd skillhub-backend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# MongoDB connection string (Atlas or self-hosted)
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT signing secret — use a long random string in production
JWT_SECRET=your-super-secret-key

# Google Custom Search API credentials (for resource search feature)
GOOGLE_API_KEY=your-google-api-key
GOOGLE_CX_ID=your-custom-search-engine-id

# Allowed CORS origin — set to your frontend URL
CLIENT_URL=http://localhost:5173

# Server port
PORT=8000
```

### Running the Server

```bash
# Development (with auto-restart via nodemon)
npx nodemon index.js

# Production
node index.js
```

The server will start on `http://localhost:8000` with the following output:

```
✅ Database connected
✅ Socket.IO initialized
🚀 Server running on port 8000
📡 WebSocket server ready
```

### Verify Installation

```bash
curl http://localhost:8000/health
# → {"status":"ok"}
```

---

## 📡 API Reference

> All endpoints return JSON. Protected routes require a `Bearer <token>` header.

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/users/register` | Register a new user | ❌ |
| `POST` | `/api/users/login` | Authenticate & receive JWT | ❌ |
| `GET` | `/api/users/profile` | Get current user profile | ✅ |
| `PUT` | `/api/users/profile` | Update user profile | ✅ |

### Courses

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/courses` | List all courses | ✅ |
| `GET` | `/api/courses/:id` | Get course details | ✅ |
| `POST` | `/api/courses` | Create a course | ✅ Admin |
| `PUT` | `/api/courses/:id` | Update a course | ✅ Admin |
| `DELETE` | `/api/courses/:id` | Delete a course | ✅ Admin |

### Enrollments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/enrollments` | Enroll in a course | ✅ |
| `GET` | `/api/enrollments/my` | Get user's enrollments | ✅ |
| `GET` | `/api/enrollments/:id` | Get enrollment details | ✅ |

### Progress & Quizzes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/progress/:courseId` | Get course progress | ✅ |
| `PUT` | `/progress/:courseId` | Update lesson progress | ✅ |
| `GET` | `/api/quizzes/:courseId` | Get course quizzes | ✅ |
| `POST` | `/api/quizzes/submit` | Submit quiz answers | ✅ |

### Messaging (REST)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/messages/:friendId` | Get conversation history | ✅ |
| `POST` | `/api/messages` | Send a message | ✅ |
| `DELETE` | `/api/messages/:id` | Delete a message | ✅ |

### Communities & Posts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/communities` | List communities | ✅ |
| `POST` | `/communities` | Create a community | ✅ |
| `GET` | `/communities/:id` | Get community details | ✅ |
| `GET` | `/posts` | List posts | ✅ |
| `POST` | `/posts` | Create a post | ✅ |
| `PUT` | `/posts/:id/like` | Like/unlike a post | ✅ |
| `POST` | `/posts/:id/comment` | Comment on a post | ✅ |

### Social

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/friends/request` | Send friend request | ✅ |
| `PUT` | `/friends/accept/:id` | Accept friend request | ✅ |
| `GET` | `/friends` | List friends | ✅ |

### Notifications & Activities

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/notifications` | Get user notifications | ✅ |
| `PUT` | `/notifications/:id/read` | Mark notification read | ✅ |
| `GET` | `/activities` | Get activity log | ✅ |

### Admin

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/admin/overview` | Dashboard statistics | ✅ Admin |
| `GET` | `/api/admin/users` | List all users | ✅ Admin |
| `GET` | `/api/admin/users/:id` | Get user details | ✅ Admin |
| `GET` | `/api/admin/reports` | List user reports | ✅ Admin |
| `GET` | `/api/admin/logs` | Get admin action logs | ✅ Admin |

### Miscellaneous

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/health` | Health check | ❌ |
| `GET` | `/api/certificates` | Get user certificates | ✅ |
| `GET` | `/api/achievements` | Get user achievements | ✅ |
| `GET` | `/api/leaderboard` | Get leaderboard | ✅ |
| `POST` | `/api/feedback` | Submit feedback | ✅ |
| `GET` | `/api/resources/:courseId` | Get course resources | ✅ |

---

## 🔌 WebSocket Events

> Socket.IO connects on the same server. Authenticate via `handshake.auth.token`.

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `send_message` | `{ tempId, receiverId, text, replyTo? }` | Send a direct message |
| `edit_message` | `{ messageId, text, receiverId }` | Edit an existing message |
| `delete_message` | `{ messageId, receiverId }` | Delete a message |
| `add_reaction` | `{ messageId, emoji }` | Toggle emoji reaction |
| `typing` | `{ receiverId }` | Broadcast typing indicator |
| `stop_typing` | `{ receiverId }` | Clear typing indicator |
| `mark_read` | `{ messageId }` | Mark single message as read |
| `mark_all_read` | `{ senderId }` | Mark all messages from user as read |
| `send_friend_request` | `{ recipientId }` | Notify recipient of friend request |
| `friend_request_response` | `{ requestId, status }` | Broadcast friend request update |
| `join_conversation` | `{ friendId }` | Join a conversation room |
| `leave_conversation` | `{ friendId }` | Leave a conversation room |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `new_message` | `{ message, tempId }` | New message received |
| `message_sent` | `{ message, tempId }` | Confirmation of sent message |
| `message_edited` | `{ message }` | Message was edited |
| `message_deleted` | `{ messageId }` | Message was deleted |
| `reaction_updated` | `{ message }` | Reaction added/removed |
| `user_typing` | `{ userId }` | User is typing |
| `user_stop_typing` | `{ userId }` | User stopped typing |
| `message_read` | `{ messageId, readAt }` | Read receipt |
| `messages_read` | `{ by }` | All messages marked read |
| `user_online` | `{ userId }` | User came online |
| `user_offline` | `{ userId }` | User went offline |
| `friend_request_received` | `{ from }` | Incoming friend request |
| `friend_request_updated` | `{ requestId, status }` | Friend request status change |
| `error` | `{ message }` | Operation error |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

Tests use **Jest** + **Supertest** and run with `NODE_ENV=test`.

### CI Pipeline

The GitHub Actions workflow (`.github/workflows/backend-ci.yml`) runs on every push/PR to `main`:

1. **Checkout** → **Setup Node.js 18** → **Install dependencies**
2. **Run tests** (with `MONGO_URI` and `JWT_SECRET` from GitHub Secrets)
3. **Build** (if build script exists)
4. **Deploy to Render** (on push to `main` only, via deploy hook)

---

## 🐳 Docker

### Build & Run Standalone

```bash
# Build the image
docker build -t skillhub-backend .

# Run the container
docker run -d \
  --name skillhub-backend \
  -p 8000:8000 \
  -e MONGO_URI="your-mongo-uri" \
  -e JWT_SECRET="your-secret" \
  -e CLIENT_URL="http://localhost" \
  skillhub-backend
```

### Multi-Stage Build Details

| Stage | Base Image | Purpose |
|-------|-----------|---------|
| `deps` | `node:20-alpine` | Install production dependencies only (`npm ci --omit=dev`) |
| `runner` | `node:20-alpine` | Copy deps, app source; run as non-root `skillhub` user |

### Docker Compose (Full Stack)

From the project root:

```bash
# Copy and configure environment
cp .env.example .env
# Edit .env with your values

# Build and start all services
docker compose up --build

# Backend → http://localhost:8000
# Frontend → http://localhost:80
```

---

## 🚢 Deployment

### Render (Current Production)

The backend is deployed on **Render** as a Web Service:

1. Connect your GitHub repository to Render
2. Set environment variables in the Render dashboard:
   - `MONGO_URI`, `JWT_SECRET`, `GOOGLE_API_KEY`, `GOOGLE_CX_ID`, `CLIENT_URL`
3. Auto-deploy triggers on push to `main` via GitHub Actions deploy hook

### Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | ✅ | — | MongoDB connection string |
| `JWT_SECRET` | ✅ | — | JWT signing secret |
| `PORT` | ❌ | `8000` | Server port |
| `CLIENT_URL` | ❌ | `http://localhost:3000` | CORS allowed origin |
| `GOOGLE_API_KEY` | ❌ | — | Google Custom Search API key |
| `GOOGLE_CX_ID` | ❌ | — | Google Custom Search Engine ID |

---

## 🛡 Security

- **Non-root Docker user** — Application runs as a dedicated `skillhub` user inside the container
- **JWT Authentication** — Stateless tokens with configurable secret
- **Role-based Access** — `verifyToken` and `isAdmin` middleware guards
- **CORS Protection** — Configurable origin whitelist
- **No secrets in image** — `.env` is stripped during Docker build
- **Socket.IO Auth** — WebSocket connections require valid JWT token

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20.x | Runtime |
| **Express** | 5.1.x | Web framework |
| **MongoDB** | — | Database (via Mongoose 8.x) |
| **Socket.IO** | 4.8.x | Real-time communication |
| **JWT** | 9.x | Authentication |
| **bcrypt** | 6.x | Password hashing |
| **Axios** | 1.11.x | HTTP client (Google API) |
| **Jest** | 30.x | Testing framework |
| **Supertest** | 7.x | HTTP assertion library |
| **Docker** | — | Containerization |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, semicolons, etc.)
refactor: Code refactoring
test:     Adding or updating tests
chore:    Build process or auxiliary tool changes
```

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the SkillHub Team
</p>
