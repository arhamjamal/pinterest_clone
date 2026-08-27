# Database Documentation

## Database

The application uses **PostgreSQL through Supabase**.

Supabase provides:

* PostgreSQL database
* Supabase Auth
* Row Level Security (RLS)
* Database APIs

Authentication credentials are managed by Supabase Auth.

---

# Authentication Architecture

Supabase maintains authenticated users in:

```text
auth.users
```

Application-specific profile information is stored in:

```text
public.profiles
```

Relationship:

```text
auth.users
     │
     │ 1 : 1
     ▼
public.profiles
```

The `public.profiles.id` must correspond to the authenticated user's ID from `auth.users.id`.

---

# Supabase Auth Users

Supabase manages the authentication user table:

```text
auth.users
```

Do not manually create or modify authentication credentials.

Supabase Auth manages:

* Email
* Password
* Authentication providers
* Sessions
* User IDs
* Authentication metadata

Passwords must never be stored in application tables.

---

# Profiles Table

Table:

```text
public.profiles
```

| Column       | Type      | Constraints                      | Purpose                           |
| ------------ | --------- | -------------------------------- | --------------------------------- |
| id           | UUID      | Primary Key, FK to auth.users.id | Authenticated user's ID           |
| username     | VARCHAR   | UNIQUE, NOT NULL                 | Public username                   |
| display_name | VARCHAR   | NULL                             | User's display name               |
| email        | VARCHAR   | NULL                             | Application-level email reference |
| avatar_url   | TEXT      | NULL                             | Profile image URL                 |
| bio          | TEXT      | NULL                             | User biography                    |
| created_at   | TIMESTAMP | NOT NULL                         | Profile creation time             |
| updated_at   | TIMESTAMP | NOT NULL                         | Last profile update               |

---

# Profile Relationship

```text
auth.users
    │
    │ id
    ▼
public.profiles
    │
    ├── username
    ├── display_name
    ├── avatar_url
    └── bio
```

The authentication identity remains in:

```text
auth.users
```

Application profile information remains in:

```text
public.profiles
```

---

# Pins Table

Table:

```text
public.pins
```

Planned structure:

| Column               | Type      | Purpose                     |
| -------------------- | --------- | --------------------------- |
| id                   | UUID      | Pin ID                      |
| user_id              | UUID      | Pin owner                   |
| title                | VARCHAR   | Pin title                   |
| description          | TEXT      | Pin description             |
| image_url            | TEXT      | Cloudinary image URL        |
| cloudinary_public_id | TEXT      | Cloudinary asset identifier |
| width                | INTEGER   | Image width                 |
| height               | INTEGER   | Image height                |
| created_at           | TIMESTAMP | Creation time               |
| updated_at           | TIMESTAMP | Last update time            |

Relationship:

```text
profiles
    │
    │ 1 : many
    ▼
pins
```

`pins.user_id` references:

```text
profiles.id
```

---

# Future Tables

These tables will be implemented incrementally as their corresponding features are developed.

```text
profiles
pins
boards
board_pins
likes
comments
follows
```

---

# Boards

Planned structure:

```text
boards
├── id
├── user_id
├── name
├── description
├── created_at
└── updated_at
```

Relationship:

```text
profiles
    │
    │ 1 : many
    ▼
boards
```

---

# Board Pins

A many-to-many relationship exists between boards and pins.

```text
boards
   │
   │
   ▼
board_pins
   ▲
   │
   │
pins
```

Planned structure:

```text
board_pins
├── board_id
├── pin_id
└── created_at
```

A suitable primary key or unique constraint should prevent the same pin from being added to the same board more than once.

---

# Likes

Planned structure:

```text
likes
├── user_id
├── pin_id
└── created_at
```

Relationship:

```text
profiles ─── likes ─── pins
```

A unique constraint should prevent a user from liking the same pin multiple times.

---

# Comments

Planned structure:

```text
comments
├── id
├── user_id
├── pin_id
├── content
├── created_at
└── updated_at
```

Relationship:

```text
profiles
    │
    ▼
comments
    │
    ▼
pins
```

---

# Follows

Planned structure:

```text
follows
├── follower_id
├── following_id
└── created_at
```

Both fields reference:

```text
profiles.id
```

A unique constraint should prevent duplicate follow relationships.

---

# Image Storage

Images must **not** be stored directly inside PostgreSQL.

Images will be stored using:

```text
Cloudinary
```

PostgreSQL stores only image metadata.

Example:

```text
pins
--------------------------------
id
user_id
title
description
image_url
cloudinary_public_id
width
height
created_at
updated_at
```

Example image flow:

```text
Image
  │
  ▼
Cloudinary
  │
  ├── image_url
  └── public_id
          │
          ▼
     Supabase pins
```

---

# Database Security

Supabase Row Level Security (RLS) should be enabled for application tables.

Examples:

### Profiles

A user should be allowed to update their own profile.

```text
auth.uid() = profiles.id
```

### Pins

A user should be allowed to modify/delete their own pins.

```text
auth.uid() = pins.user_id
```

### Boards

A user should be allowed to modify/delete their own boards.

```text
auth.uid() = boards.user_id
```

The exact RLS policies will be implemented when each feature is developed.

---

# Database Rules

1. Use UUIDs for primary keys.
2. Use foreign keys for relationships.
3. Enable RLS on application tables.
4. Do not store passwords in `public.profiles`.
5. Authentication credentials are managed by Supabase Auth.
6. Do not store image binaries in PostgreSQL.
7. Store Cloudinary URLs and public IDs instead of image files.
8. Add appropriate indexes as the application grows.
9. Use unique constraints where duplicate relationships must be prevented.
10. Document schema changes.
11. Avoid modifying existing columns without discussing the impact on the frontend and backend.
12. Do not expose Supabase service-role credentials to the frontend.

---

# Current Database Scope

For the initial authentication/profile phase, implement only:

```text
Supabase Auth
+
public.profiles
```

Do not create unnecessary feature tables until the corresponding feature is implemented.

Future tables such as:

```text
pins
boards
board_pins
likes
comments
follows
```

should be added incrementally.
