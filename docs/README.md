# Pinterest Clone — Project Documentation

## Project Overview

A full-stack Pinterest-inspired application where users can discover, upload, save, organize, like, and interact with visual content.

## Technology Stack

### Frontend

* React
* Vite
* React Router
* CSS / Tailwind CSS

### Backend

* Node.js
* Express.js
* REST API

### Database & Authentication

* Supabase
* PostgreSQL
* Supabase Authentication

### Image Management

* Cloudinary
* Cloudinary CDN

## Repository Structure

```text
pinterest-clone/
├── frontend/
├── backend/
├── docs/
│   ├── README.md
│   ├── API.md
│   ├── AUTH_API.md
│   └── DATABASE.md
└── README.md
```

## Team Responsibilities

### Frontend Developer

Responsible for:

* React UI
* Routing
* Components
* Pages
* API integration
* Responsive design
* Frontend authentication flow

### Backend Developer

Responsible for:

* Node.js / Express
* REST APIs
* Authentication
* Database
* Authorization
* Cloudinary integration
* Backend validation
* Error handling

## Development Principle

Frontend and backend development should happen independently using agreed API contracts.

Frontend should not depend on backend implementation details.

Backend should provide stable API endpoints and documented request/response formats.

## Current Development Phase

### Phase 1 — Authentication

Current focus:

* Signup
* Login
* Logout
* Current-user/session checking
* Users table
* Authentication state
* Frontend authentication UI

### Phase 2 — Pins

Planned:

* Create Pin
* Upload image
* Cloudinary integration
* Get Pins
* Pin details
* Delete Pin

### Phase 3 — Boards

Planned:

* Create board
* Save Pin
* Remove Pin
* View board
* Delete board

### Phase 4 — Social Features

Planned:

* Likes
* Comments
* Follows
* User profiles

### Phase 5 — Discovery

Planned:

* Search
* Feed
* Categories
* Recommendations
