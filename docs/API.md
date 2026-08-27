# API Documentation

## Base URL

### Development

```text
http://localhost:5000/api
```

### Production

```text
TBD
```

The frontend must use an environment variable instead of hardcoding the API URL.

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Authentication Architecture

Authentication is handled by **Supabase Auth**.

The Express backend does **not** provide custom authentication endpoints such as:

```text
POST /auth/signup
POST /auth/login
POST /auth/logout
GET  /auth/me
```

Instead, the frontend communicates directly with Supabase Auth.

### Frontend Authentication

The frontend uses the Supabase client for:

* User registration
* User login
* User logout
* Session management
* Password reset
* Getting the currently authenticated user

Example:

```text
React Frontend
      │
      ├── supabase.auth.signUp()
      ├── supabase.auth.signInWithPassword()
      ├── supabase.auth.signOut()
      └── supabase.auth.getUser()
              │
              ▼
        Supabase Auth
```

---

# Backend Authentication

Protected backend APIs require an authenticated Supabase user.

The frontend sends the Supabase access token with API requests.

```http
Authorization: Bearer <supabase_access_token>
```

The Express backend uses authentication middleware to validate the token and identify the user.

```text
Frontend
   │
   │ Authorization: Bearer <token>
   ▼
Express Backend
   │
   ▼
Auth Middleware
   │
   ├── Invalid / missing token → 401 Unauthorized
   │
   └── Valid token
          │
          ▼
     API Controller
```

The backend is responsible for **authorization**, such as checking whether a user owns a pin or board.

---

# Response Format

Successful response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# HTTP Status Codes

| Status | Meaning            |
| ------ | ------------------ |
| 200    | Successful request |
| 201    | Resource created   |
| 400    | Bad request        |
| 401    | Unauthorized       |
| 403    | Forbidden          |
| 404    | Resource not found |
| 409    | Conflict           |
| 500    | Server error       |

---

# API Modules

## Pins

### Create Pin

```text
POST /pins
```

Authentication:

```text
Required
```

The authenticated user's ID is obtained from the validated Supabase token.

Planned request:

```json
{
  "title": "Mountain",
  "description": "Beautiful mountain view",
  "image_url": "https://res.cloudinary.com/...",
  "cloudinary_public_id": "pins/example",
  "width": 1200,
  "height": 800
}
```

---

### Get Pins

```text
GET /pins
```

Authentication:

```text
Optional
```

---

### Get Pin

```text
GET /pins/:id
```

Authentication:

```text
Optional
```

---

### Delete Pin

```text
DELETE /pins/:id
```

Authentication:

```text
Required
```

The backend must verify that the authenticated user owns the pin before deleting it.

---

# Boards

### Create Board

```text
POST /boards
```

Authentication:

```text
Required
```

---

### Get Boards

```text
GET /boards
```

Authentication:

```text
Optional
```

---

### Get Board

```text
GET /boards/:id
```

Authentication:

```text
Optional
```

---

### Delete Board

```text
DELETE /boards/:id
```

Authentication:

```text
Required
```

The backend must verify board ownership before deletion.

---

### Add Pin to Board

```text
POST /boards/:id/pins
```

Authentication:

```text
Required
```

---

### Remove Pin from Board

```text
DELETE /boards/:id/pins/:pinId
```

Authentication:

```text
Required
```

---

# Likes

### Like Pin

```text
POST /pins/:id/like
```

Authentication:

```text
Required
```

---

### Unlike Pin

```text
DELETE /pins/:id/like
```

Authentication:

```text
Required
```

---

# Comments

### Create Comment

```text
POST /pins/:id/comments
```

Authentication:

```text
Required
```

---

### Get Comments

```text
GET /pins/:id/comments
```

Authentication:

```text
Optional
```

---

### Delete Comment

```text
DELETE /comments/:id
```

Authentication:

```text
Required
```

The backend must verify that the authenticated user owns the comment before deleting it.

---

# Users / Profiles

### Get User Profile

```text
GET /users/:username
```

Authentication:

```text
Optional
```

---

### Update Current User Profile

```text
PATCH /users/me
```

Authentication:

```text
Required
```

The backend determines the user from the authenticated Supabase token.

The frontend must not send an arbitrary `user_id` to update another user's profile.

---

# Follows

### Follow User

```text
POST /users/:id/follow
```

Authentication:

```text
Required
```

---

### Unfollow User

```text
DELETE /users/:id/follow
```

Authentication:

```text
Required
```

---

# Cloudinary Image Upload

Images are stored in **Cloudinary**, not in PostgreSQL.

The backend is responsible for securely handling Cloudinary operations that require secret credentials.

Basic flow:

```text
Frontend
    │
    │ Image
    ▼
Backend
    │
    ▼
Cloudinary
    │
    │ Image URL + public ID
    ▼
Backend
    │
    ▼
Supabase Database
```

The database stores image metadata such as:

```text
image_url
cloudinary_public_id
width
height
```

Cloudinary API secrets must never be exposed to the frontend.

---

# Protected API Rule

Any API marked as `Required` must pass through the authentication middleware.

Example:

```text
POST /pins
      │
      ▼
auth.middleware
      │
      ├── Invalid token → 401
      │
      ▼
pin.controller
      │
      ▼
Supabase Database
```

---

# Authentication vs Authorization

### Authentication

Determines:

> Who is the user?

Handled by:

```text
Supabase Auth
```

### Authorization

Determines:

> Is this user allowed to perform this operation?

Handled by:

```text
Express Backend
```

Example:

```text
User A attempts to delete User B's pin
             │
             ▼
       Auth Middleware
             │
             ▼
       User is valid
             │
             ▼
       Ownership Check
             │
             ▼
       User does not own pin
             │
             ▼
          403 Forbidden
```

---

# API Contract Rule

Before changing any endpoint's:

* URL
* HTTP method
* request body
* response structure
* authentication requirement
* status code

update this documentation and inform the other developer.

Authentication changes involving Supabase Auth should also be communicated to the frontend developer.
